const express = require('express');
const router = express.Router();
const multer = require('multer');
const Groq = require('groq-sdk');
const PDFParser = require('pdf2json');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const upload = multer({ storage: multer.memoryStorage() });

// -------------------------
// Extract text from PDF buffer
// -------------------------
function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);
    pdfParser.on('pdfParser_dataError', (err) => reject(new Error(err.parserError)));
    pdfParser.on('pdfParser_dataReady', () => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });
    pdfParser.parseBuffer(buffer);
  });
}

// -------------------------
// Safe AI response parser
// -------------------------
function safeParseGroqResponse(raw) {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in AI response');

  const parsed = JSON.parse(match[0]);

  // Handle all possible capitalisations of ATSbreakdown
  const atsBD = parsed.ATSbreakdown || parsed.atsBreakdown || parsed.ATSBreakdown || {};

  return {
    requiredSkills: Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills : [],
    missingSkills:  Array.isArray(parsed.missingSkills)  ? parsed.missingSkills  : [],
    score:
      typeof parsed.score === 'number'
        ? Math.min(100, Math.max(0, parsed.score))
        : typeof parsed.score === 'string' && !isNaN(parsed.score)
        ? Math.min(100, Math.max(0, parseInt(parsed.score)))
        : 50,
    tips: Array.isArray(parsed.tips) ? parsed.tips : [],
    professionalSummary:
      typeof parsed.professionalSummary === 'string' ? parsed.professionalSummary : '',
    atsBreakdown: {
      skillsMatch:      parseInt(atsBD.skillsMatch)      || 0,
      formatting:       parseInt(atsBD.formatting)        || 0,
      keywords:         parseInt(atsBD.keywords)          || 0,
      experienceImpact: parseInt(atsBD.experienceImpact)  || 0,
    },
    sectionStrengths: {
      professionalSummary: parseInt(parsed.sectionStrengths?.professionalSummary) || 0,
      projects:            parseInt(parsed.sectionStrengths?.projects)             || 0,
      experience:          parseInt(parsed.sectionStrengths?.experience)           || 0,
      skills:              parseInt(parsed.sectionStrengths?.skills)               || 0,
      education:           parseInt(parsed.sectionStrengths?.education)            || 0,
    },
  };
}

// -------------------------
// POST /api/upload
// -------------------------
router.post('/upload', upload.single('resume'), async (req, res) => {
  console.log('--- /api/upload hit ---');
  console.log('File received:', req.file ? req.file.originalname : 'NO FILE');

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const jobTitle = (req.body.jobTitle || '').trim();
    if (!jobTitle || jobTitle.length < 2) {
      return res.status(400).json({ error: 'jobTitle is required.' });
    }

    let resumeText = '';
    try {
      console.log('Parsing PDF buffer of size:', req.file.buffer.length);
      resumeText = await extractTextFromPDF(req.file.buffer);
      resumeText = resumeText.slice(0, 3000);
      console.log('PDF text extracted, length:', resumeText.length);
    } catch (pdfErr) {
      console.error('PDF parse error:', pdfErr.message);
      return res.status(422).json({ error: 'Could not read PDF. Make sure it contains selectable text.' });
    }

    if (!resumeText.trim()) {
      return res.status(422).json({ error: 'PDF appears to be empty or scanned. Please upload a text-based PDF.' });
    }

    const prompt = `
You are an expert career counsellor and resume coach.

A job seeker is targeting the role of: "${jobTitle}"

Here is their resume content:
${resumeText}

Your task:
1. Identify top skills required for this role
2. Identify skills missing from the candidate's resume
3. Evaluate the resume honestly and give a score out of 100. Do NOT default to 72. A strong match = 80-95, average match = 50-75, weak match = 20-49. Base the score purely on how well this specific resume matches this specific role.
4. Give 3-5 actionable improvement tips
5. Suggest a professional summary for this candidate
6. Give an honest ATS breakdown score (0-100) for each. Do NOT return the same number for all:
   - skillsMatch: how well their skills match the role
   - formatting: how clean and ATS-readable the resume is
   - keywords: how many relevant keywords appear
   - experienceImpact: how strong and quantified the experience is
7. Give an honest strength score (0-100) for each section. Do NOT return the same number for all:
   - professionalSummary, projects, experience, skills, education

Respond ONLY with a valid JSON object. No markdown, no extra text, no code blocks:
{
  "requiredSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "score": 65,
  "tips": ["tip1", "tip2"],
  "professionalSummary": "summary here",
  "ATSbreakdown": {
    "skillsMatch": 70,
    "formatting": 85,
    "keywords": 60,
    "experienceImpact": 55
  },
  "sectionStrengths": {
    "professionalSummary": 75,
    "projects": 80,
    "experience": 65,
    "skills": 70,
    "education": 90
  }
}
`;

    console.log('Sending to Groq...');
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.0,
      max_tokens: 1000,
    });

    const raw = completion.choices?.[0]?.message?.content || '';
    console.log('FULL RAW RESPONSE:', raw);
    const analysis = safeParseGroqResponse(raw);
    console.log('FINAL ANALYSIS:', JSON.stringify(analysis));

    return res.json(analysis);

  } catch (err) {
    console.error('Upload route error:', err.message);

    if (err.message?.toLowerCase().includes('api key')) {
      return res.status(500).json({ error: 'Invalid Groq API key.' });
    }
    if (err.status === 429 || err.message?.toLowerCase().includes('rate')) {
      return res.status(429).json({ error: 'Rate limit reached. Wait a moment and try again.' });
    }
    if (err.message?.includes('No JSON in AI response')) {
      return res.status(502).json({ error: 'AI response format was invalid. Try again.' });
    }

    return res.status(500).json({ error: 'Upload analysis failed. Please try again.' });
  }
});

module.exports = router;
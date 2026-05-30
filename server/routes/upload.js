const express = require('express');
const router = express.Router();
const multer = require('multer');
const Groq = require('groq-sdk');
const PDFParser = require('pdf2json');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Store file in memory (no disk writes)
const upload = multer({ storage: multer.memoryStorage() });

// -------------------------
// Extract text from PDF buffer
// -------------------------
function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);

    pdfParser.on('pdfParser_dataError', (err) => {
      reject(new Error(err.parserError));
    });

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
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in AI response');

  const parsed = JSON.parse(match[0]);

  return {
    requiredSkills: Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills : [],
    missingSkills:  Array.isArray(parsed.missingSkills)  ? parsed.missingSkills  : [],
    score:
      typeof parsed.score === 'number'
        ? Math.min(100, Math.max(0, parsed.score))
        : 50,
    tips: Array.isArray(parsed.tips) ? parsed.tips : [],
    professionalSummary:
      typeof parsed.professionalSummary === 'string' ? parsed.professionalSummary : '',
  };
}

// -------------------------
// POST /api/upload
// -------------------------
router.post('/upload', upload.single('resume'), async (req, res) => {
  console.log('--- /api/upload hit ---');
  console.log('File received:', req.file ? req.file.originalname : 'NO FILE');
  console.log('Body:', req.body);

  try {
    // 1. Check file
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // 2. Check job title
    const jobTitle = (req.body.jobTitle || '').trim();
    if (!jobTitle || jobTitle.length < 2) {
      return res.status(400).json({ error: 'jobTitle is required.' });
    }

    // 3. Extract text from PDF
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

    // 4. Send to Groq
    const prompt = `
You are an expert career counsellor and resume coach.

A job seeker is targeting the role of: "${jobTitle}"

Here is their resume content:
${resumeText}

Your task:
1. Identify top skills required for this role
2. Identify skills missing from the candidate's resume
3. 3. Evaluate the resume honestly and give a score out of 100 based on how well the candidate's actual skills, experience, and education match the requirements of the target role. The score must reflect the real strength of the resume — do not default to 72. A strong match should score 80+, an average match 50 to 75, and a weak match below 50.
4. Give 3-5 actionable improvement tips
5. Suggest a professional summary for this candidate

Respond ONLY in JSON format:

{
  "requiredSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "score": ["score out of 100"],
  "tips": ["tip1", "tip2"],
  "professionalSummary": "summary here"
}
`;

    console.log('Sending to Groq...');
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const raw = completion.choices?.[0]?.message?.content || '';
    console.log('RAW GROQ RESPONSE:', raw);
    console.log('PARSED SCORE:', safeParseGroqResponse(raw).score);
    console.log('Groq response received, length:', raw.length);
    const analysis = safeParseGroqResponse(raw);

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
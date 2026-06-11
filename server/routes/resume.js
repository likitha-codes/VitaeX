const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const upload = require('../middleware/upload');
const Groq = require('groq-sdk');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// -------------------------
// POST /api/resume/save
// Save a built resume to MongoDB
// -------------------------
router.post('/save', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      linkedin,
      location,
      skills,
      experience,
      education,
      projects,
      certifications,
      targetRole,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const resume = new Resume({
      name,
      email,
      phone,
      linkedin,
      location,
      skills: Array.isArray(skills) ? skills : [],
      experience: Array.isArray(experience) ? experience : [],
      education: Array.isArray(education) ? education : [],
      projects: Array.isArray(projects) ? projects : [],
      certifications: Array.isArray(certifications) ? certifications : [],
      targetRole,
    });

    const saved = await resume.save();

    return res.status(201).json({ message: 'Resume saved.', id: saved._id, resume: saved });
  } catch (err) {
    console.error('Save error:', err.message);
    return res.status(500).json({ error: 'Failed to save resume.' });
  }
});

// -------------------------
// GET /api/resume/:id
// Fetch a resume by ID
// -------------------------
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }

    return res.json(resume);
  } catch (err) {
    console.error('Fetch error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch resume.' });
  }
});

// -------------------------
// POST /api/resume/upload
// Upload PDF or DOCX, extract text, analyse with Groq
// -------------------------
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { targetRole } = req.body;

    if (!targetRole || !targetRole.trim()) {
      return res.status(400).json({ error: 'targetRole is required.' });
    }

    let extractedText = '';

    // Extract text based on file type
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    } else {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      extractedText = result.value;
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract enough text from the file.' });
    }

    // Truncate to avoid huge Groq payloads
    const resumeText = extractedText.trim().slice(0, 3000);

    const prompt = `
You are an expert career counsellor and resume coach.

A job seeker is applying for: "${targetRole.trim()}"

Here is their resume content:
${resumeText}

Your task:
1. Identify top skills required for this role
2. Identify skills missing from their resume
3. Give a resume score out of 100
4. Give 3–5 actionable improvement tips
5. Suggest a professional summary for this role

Respond ONLY in this JSON format:
{
  "requiredSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "score": 72,
  "tips": ["tip1", "tip2"],
  "professionalSummary": "summary text here"
}
`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const raw = completion.choices?.[0]?.message?.content || '';
    const match = raw.match(/\{[\s\S]*\}/);

    if (!match) {
      return res.status(502).json({ error: 'AI response was invalid. Try again.' });
    }

    const analysis = JSON.parse(match[0]);

    // Clamp score to 0-100
    if (typeof analysis.score === 'number') {
      analysis.score = Math.min(100, Math.max(0, analysis.score));
    }

    // Save to MongoDB
    const resume = new Resume({
      name: 'Uploaded Resume',
      email: 'n/a',
      resumeText,
      targetRole: targetRole.trim(),
      analysis,
    });

    const saved = await resume.save();

    return res.status(201).json({
      message: 'Resume analysed.',
      id: saved._id,
      analysis,
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    return res.status(500).json({ error: 'Upload and analysis failed.' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const Resume = require('../models/Resume');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// -------------------------
// Validation helper
// -------------------------
function validatePayload(body) {
  const errors = [];

  if (!body.jobTitle || !body.jobTitle.trim()) {
    errors.push('jobTitle is required.');
  } else if (body.jobTitle.trim().length < 2) {
    errors.push('jobTitle must be at least 2 characters.');
  }

  if (!body.skills || !body.skills.trim()) {
    errors.push('skills is required.');
  }

  return errors;
}

// -------------------------
// Sanitise helper
// -------------------------
function sanitise(value) {
  if (!value) return '';
  return String(value).trim().slice(0, 2000);
}

router.post('/analyse', async (req, res) => {
  try {
    const errors = validatePayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors,
      });
    }

    const jobTitle = sanitise(req.body.jobTitle);
    const skills = sanitise(req.body.skills);
    const experience = sanitise(req.body.experience);
    const education = sanitise(req.body.education);

    const prompt = `
You are an expert career counsellor and resume coach.

A job seeker is targeting the role of: "${jobTitle}"

Their current skills:
${skills}

Experience:
${experience || 'Not provided'}

Education:
${education || 'Not provided'}

Your task:

1. Identify the top skills required for "${jobTitle}" in the current job market.
2. Identify the skill gaps (skills they are missing).
3. Evaluate the resume honestly and give a score out of 100.
4. Give 3-5 specific actionable improvement tips.
5. Suggest a professional summary they can use.
6. Give an ATS breakdown score (0-100) for:
   - skillsMatch
   - formatting
   - keywords
   - experienceImpact
7. Give a strength score (0-100) for:
   - professionalSummary
   - projects
   - experience
   - skills
   - education

Respond ONLY with valid JSON:

{
  "requiredSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "score": 65,
  "tips": ["tip1", "tip2", "tip3"],
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

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.0,
      max_tokens: 1000,
    });

    const raw = completion.choices?.[0]?.message?.content || '';

    const cleaned = raw.replace(/```json|```/g, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        error: 'Invalid AI response format',
      });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const atsBD =
      parsed.ATSbreakdown ||
      parsed.atsBreakdown ||
      parsed.ATSBreakdown ||
      {};

    const analysis = {
      requiredSkills: Array.isArray(parsed.requiredSkills)
        ? parsed.requiredSkills
        : [],

      missingSkills: Array.isArray(parsed.missingSkills)
        ? parsed.missingSkills
        : [],

      score: parseInt(parsed.score) || 50,

      tips: Array.isArray(parsed.tips)
        ? parsed.tips
        : [],

      professionalSummary:
        typeof parsed.professionalSummary === 'string'
          ? parsed.professionalSummary
          : '',

      atsBreakdown: {
        skillsMatch: parseInt(atsBD.skillsMatch) || 0,
        formatting: parseInt(atsBD.formatting) || 0,
        keywords: parseInt(atsBD.keywords) || 0,
        experienceImpact: parseInt(atsBD.experienceImpact) || 0,
      },

      sectionStrengths: {
        professionalSummary:
          parseInt(parsed.sectionStrengths?.professionalSummary) || 0,

        projects:
          parseInt(parsed.sectionStrengths?.projects) || 0,

        experience:
          parseInt(parsed.sectionStrengths?.experience) || 0,

        skills:
          parseInt(parsed.sectionStrengths?.skills) || 0,

        education:
          parseInt(parsed.sectionStrengths?.education) || 0,
      },
    };

    try {
      await Resume.findOneAndUpdate(
        { targetRole: jobTitle },
        { $set: { analysis } },
        { new: true }
      );
    } catch (dbErr) {
      console.warn('DB save skipped:', dbErr.message);
    }

    console.log('FULL ANALYSIS:', JSON.stringify(analysis));

    return res.json(analysis);
  } catch (err) {
    console.error('Error:', err.message);

    if (err.message?.toLowerCase().includes('api key')) {
      return res.status(500).json({
        error: 'Invalid API key.',
      });
    }

    if (
      err.status === 429 ||
      err.message?.toLowerCase().includes('rate')
    ) {
      return res.status(429).json({
        error: 'Rate limit reached. Wait a moment.',
      });
    }

    return res.status(500).json({
      error: 'Analysis failed. Please try again.',
    });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

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
// Prevent huge payloads
// -------------------------
function sanitise(value) {
  if (!value) return '';

  return String(value)
    .trim()
    .slice(0, 2000);
}

// -------------------------
// Safe AI response parser
// -------------------------
function safeParseGroqResponse(raw) {
  const match = raw.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error('No JSON in AI response');
  }

  const parsed = JSON.parse(match[0]);

  return {
    requiredSkills: Array.isArray(parsed.requiredSkills)
      ? parsed.requiredSkills
      : [],

    missingSkills: Array.isArray(parsed.missingSkills)
      ? parsed.missingSkills
      : [],

    score:
      typeof parsed.score === 'number'
        ? Math.min(10, Math.max(0, parsed.score))
        : 5,

    tips: Array.isArray(parsed.tips)
      ? parsed.tips
      : [],

    professionalSummary:
      typeof parsed.professionalSummary === 'string'
        ? parsed.professionalSummary
        : '',
  };
}

router.post('/analyse', async (req, res) => {
  try {
    // -------------------------
    // Validate input
    // -------------------------
    const errors = validatePayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors,
      });
    }

    // -------------------------
    // Sanitise input
    // -------------------------
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
1. Identify top skills required
2. Identify missing skills
3. Give resume score out of 10
4. Give 3–5 actionable tips
5. Suggest professional summary

Respond ONLY in JSON format:

{
  "requiredSkills": ["skill1"],
  "missingSkills": ["skill1"],
  "score": 7,
  "tips": ["tip1"],
  "professionalSummary": "summary"
}
`;

    const completion =
      await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

    const raw =
      completion.choices?.[0]?.message?.content || '';

    const analysis =
      safeParseGroqResponse(raw);

    return res.json(analysis);
  } catch (err) {
    console.error('Error:', err.message);

    // Invalid API key
    if (
      err.message?.toLowerCase().includes('api key')
    ) {
      return res.status(500).json({
        error: 'Invalid API key.',
      });
    }

    // Rate limit
    if (
      err.status === 429 ||
      err.message?.toLowerCase().includes('rate')
    ) {
      return res.status(429).json({
        error:
          'Rate limit reached. Wait a moment.',
      });
    }

    // AI parse failure
    if (
      err.message?.includes(
        'No JSON in AI response'
      )
    ) {
      return res.status(502).json({
        error:
          'AI response format was invalid.',
      });
    }

    // Generic fallback
    return res.status(500).json({
      error:
        'Analysis failed. Please try again.',
    });
  }
});

module.exports = router;
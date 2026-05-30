const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/analyse', async (req, res) => {
  const { jobTitle, skills, experience, education } = req.body;

  if (!jobTitle || !skills) {
    return res.status(400).json({ error: 'jobTitle and skills are required' });
  }

  const prompt = `
You are an expert career counsellor and resume coach.

A job seeker is targeting the role of: "${jobTitle}"
Their current skills: ${skills}
Experience: ${experience || 'Not provided'}
Education: ${education || 'Not provided'}

Your task:
1. Identify the top skills required for "${jobTitle}" in the current job market
2. Identify the skill gaps (skills they are missing)
3. Evaluate the resume honestly and give a score out of 100 based on how well the candidate's actual skills, experience, and education match the requirements of "${jobTitle}". The score must reflect the real strength of the resume — do not default to 72. A strong match should score 8-10, an average match 5-7, and a weak match below 5.
4. Give 3-5 specific, actionable improvement tips
5. Suggest a professional summary they can use

Respond ONLY in this JSON format with no extra text:
{
  "requiredSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "score": ["score out of 100"],
  "tips": ["tip1", "tip2", "tip3"],
  "professionalSummary": "A motivated..."
}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const raw = completion.choices[0]?.message?.content || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Invalid AI response format' });
    }

    const analysis = JSON.parse(jsonMatch[0]);
    res.json(analysis);

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

module.exports = router;
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
3. Evaluate the resume honestly and give a score out of 100. Do NOT default to 72. A strong match = 80-95, average match = 50-75, weak match = 20-49.
4. Give 3-5 specific, actionable improvement tips
5. Suggest a professional summary they can use
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

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.0,
      max_tokens: 1000,
    });

    const raw = completion.choices[0]?.message?.content || '';
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Invalid AI response format' });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Handle both ATSbreakdown and atsBreakdown
    const atsBD = parsed.ATSbreakdown || parsed.atsBreakdown || parsed.ATSBreakdown || {};

    const analysis = {
      requiredSkills:      Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills : [],
      missingSkills:       Array.isArray(parsed.missingSkills)  ? parsed.missingSkills  : [],
      score:               parseInt(parsed.score)               || 50,
      tips:                Array.isArray(parsed.tips)           ? parsed.tips           : [],
      professionalSummary: typeof parsed.professionalSummary === 'string' ? parsed.professionalSummary : '',
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

    console.log('FULL ANALYSIS:', JSON.stringify(analysis));
    res.json(analysis);

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

module.exports = router;
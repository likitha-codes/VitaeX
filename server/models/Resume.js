const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String },
  education: { type: String },
  analysis: {
    requiredSkills: [String],
    missingSkills: [String],
    score: Number,
    tips: [String],
    professionalSummary: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);
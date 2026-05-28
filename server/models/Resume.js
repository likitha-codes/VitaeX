const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// -------------------------
// Save Resume
// POST /api/resume
// -------------------------
router.post('/', async (req, res) => {
  try {
    const resume = new Resume(req.body);
    const savedResume = await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume saved successfully',
      data: savedResume,
    });
  } catch (err) {
    console.error('Save Resume Error:', err.message);

    res.status(500).json({
      success: false,
      error: 'Failed to save resume',
    });
  }
});

// -------------------------
// Get All Resumes
// GET /api/resume
// -------------------------
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: resumes,
    });
  } catch (err) {
    console.error('Get Resumes Error:', err.message);

    res.status(500).json({
      success: false,
      error: 'Failed to fetch resumes',
    });
  }
});

// -------------------------
// Get Resume by ID
// GET /api/resume/:id
// -------------------------
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found',
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (err) {
    console.error('Get Resume Error:', err.message);

    res.status(500).json({
      success: false,
      error: 'Failed to fetch resume',
    });
  }
});

// -------------------------
// Update Resume
// PUT /api/resume/:id
// -------------------------
router.put('/:id', async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume updated successfully',
      data: updatedResume,
    });
  } catch (err) {
    console.error('Update Resume Error:', err.message);

    res.status(500).json({
      success: false,
      error: 'Failed to update resume',
    });
  }
});

// -------------------------
// Delete Resume
// DELETE /api/resume/:id
// -------------------------
router.delete('/:id', async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);

    if (!deletedResume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (err) {
    console.error('Delete Resume Error:', err.message);

    res.status(500).json({
      success: false,
      error: 'Failed to delete resume',
    });
  }
});

module.exports = router;
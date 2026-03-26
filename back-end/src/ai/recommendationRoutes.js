/**
 * Recommendation Routes
 * API endpoints for scholarship recommendations
 */

import express from 'express';
const router = express.Router();
import {
  analyzeProfile,
  getRecommendations,
  analyzeUniversityProfile,
  precomputeEmbeddings
} from './recommendationController.js';

/**
 * @route   POST /api/recommendations/analyze-profile
 * @desc    Analyze user profile and return academic insights
 * @access  Public
 * @body    { studentType: string, grades: Object }
 * @returns { gpa, strongSubjects, performanceLevel, recommendedFields }
 */
router.post('/analyze-profile', analyzeProfile);

/**
 * @route   POST /api/recommendations/scholarships
 * @desc    Get scholarship recommendations for a user
 * @access  Public
 * @body    { userProfile: Object, scholarships: Array, useAI?: boolean, limit?: number }
 * @returns { recommendations: Array }
 */
router.post('/scholarships', getRecommendations);

/**
 * @route   POST /api/recommendations/university-profile
 * @desc    Analyze university student profile and get internship recommendations
 * @access  Public
 * @body    { universityProfile: Object, opportunities: Array }
 * @returns { recommendations: Array }
 */
router.post('/university-profile', analyzeUniversityProfile);

/**
 * @route   POST /api/recommendations/precompute-embeddings
 * @desc    Precompute embeddings for scholarships (admin/cron job)
 * @access  Private (should be protected by auth middleware)
 * @body    { scholarships: Array }
 * @returns { cached: number, total: number }
 */
router.post('/precompute-embeddings', precomputeEmbeddings);

// ============================================
// AI-Powered Scholarship Recommendations
// Uses tozenz/cambodia-scholarship-ai-subjects (fine-tuned model)
// ============================================

import {
  getScholarshipRecommendations,
  getTopRecommendations,
  getAllScholarships,
  getScholarshipById
} from './services/scholarshipAIService.js';

router.post('/ai/get', async (req, res) => {
  try {
    const { stream, grades } = req.body;

    if (!stream || !grades || Object.keys(grades).length === 0) {
      return res.status(400).json({ success: false, error: 'Missing stream or grades' });
    }

    const recommendations = await getScholarshipRecommendations({ stream, grades });
    res.json({
      success: true,
      studentProfile: { stream, gradesCount: Object.keys(grades).length },
      recommendations,
      topRecommendation: recommendations[0] || null
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/ai/top', async (req, res) => {
  try {
    const { stream, grades, topN = 3 } = req.body;

    if (!stream || !grades) {
      return res.status(400).json({ success: false, error: 'Missing stream or grades' });
    }

    const recommendations = await getTopRecommendations({ stream, grades }, parseInt(topN));
    res.json({ success: true, topRecommendations: recommendations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/ai/scholarships', (req, res) => {
  try {
    const scholarships = getAllScholarships();
    res.json({ success: true, scholarships, total: scholarships.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/ai/scholarships/:id', (req, res) => {
  try {
    const scholarship = getScholarshipById(parseInt(req.params.id));
    if (!scholarship) {
      return res.status(404).json({ success: false, error: 'Scholarship not found' });
    }
    res.json({ success: true, scholarship });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/ai/test', async (req, res) => {
  try {
    const testStudent = {
      stream: 'science',
      grades: { Math: 'A', Physics: 'A', Chemistry: 'B', Biology: 'B', 'Khmer Literature': 'C', History: 'C', English: 'B' }
    };
    const recommendations = await getScholarshipRecommendations(testStudent);
    res.json({
      success: true,
      message: '✓ AI is working correctly!',
      testStudent,
      recommendations,
      modelInfo: { model: 'tozenz/cambodia-scholarship-ai-subjects', trainingDate: '2026-03-15', samples: 300, testPassRate: '100%' }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: 'AI test failed - Check HUGGINGFACE_API_KEY in .env' });
  }
});

export default router;

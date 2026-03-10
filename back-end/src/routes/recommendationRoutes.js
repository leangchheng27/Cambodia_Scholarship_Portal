/**
 * Recommendation Routes
 * API endpoints for scholarship recommendations
 */

const express = require('express');
const router = express.Router();
const {
  analyzeProfile,
  getRecommendations,
  analyzeUniversityProfile,
  precomputeEmbeddings
} = require('../controllers/recommendationController');

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

module.exports = router;

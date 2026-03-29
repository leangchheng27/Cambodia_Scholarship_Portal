/**
 * Recommendation Routes
 * API endpoints for scholarship recommendations using field-based filtering
 */

import express from 'express';
const router = express.Router();
import {
  getScholarshipsByMajorFields
} from './recommendationController.js';

/**
 * @route   POST /api/recommendations/scholarships-by-fields
 * @desc    Get scholarships filtered by major field names
 * @access  Public
 * @body    { majorTitles: string[] }
 * @returns { success: boolean, scholarships: Array, total: number }
 */
router.post('/scholarships-by-fields', getScholarshipsByMajorFields);

// ============================================
// Custom Model Integration
// Uses leangchheng27/Cambodia-Scholarship-Portal
// ============================================

import {
  getCustomModelRecommendations,
  healthCheck
} from './services/customModelService.js';

/**
 * @route   POST /api/recommendations/custom/recommend
 * @desc    Get scholarship recommendations using custom HF model
 * @access  Public
 */
router.post('/custom/recommend', async (req, res) => {
  try {
    const { studentProfile, scholarships, limit = 10 } = req.body;

    if (!studentProfile || !studentProfile.stream) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing studentProfile or stream' 
      });
    }

    if (!Array.isArray(scholarships) || scholarships.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing or empty scholarships array' 
      });
    }

    console.log(`📨 [API] Recommendation request: ${scholarships.length} majors`);

    const recommendations = await getCustomModelRecommendations(studentProfile, scholarships);
    const limitedRecommendations = recommendations.slice(0, limit);

    res.json({
      success: true,
      studentProfile: {
        stream: studentProfile.stream,
        gradesCount: studentProfile.grades ? Object.keys(studentProfile.grades).length : 0
      },
      recommendations: limitedRecommendations,
      totalMatched: recommendations.length,
      model: process.env.HF_CUSTOM_MODEL || 'leangchheng27/Cambodia-Scholarship-Portal'
    });
  } catch (error) {
    console.error('❌ API Error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recommendations/custom/health
 * @desc    Check custom model service health
 * @access  Public
 */
router.get('/custom/health', (req, res) => {
  const hasApiKey = !!process.env.HUGGINGFACE_API_KEY;
  res.json({
    service: 'custom-model',
    configured: hasApiKey,
    model: process.env.HF_CUSTOM_MODEL || 'leangchheng27/Cambodia-Scholarship-Portal',
    status: hasApiKey ? 'ready' : 'not-configured'
  });
});

/**
 * @route   POST /api/recommendations/custom/test
 * @desc    Test the custom model
 * @access  Public
 */
router.post('/custom/test', async (req, res) => {
  try {
    const testStudent = {
      stream: 'science',
      grades: { Math: 'A', Physics: 'A', Chemistry: 'B', Biology: 'B' }
    };

    const MAJORS = [
      { id: 1, title: 'IT & Computer Science', description: 'Master software, AI, and digital systems' },
      { id: 2, title: 'Engineering', description: 'Build infrastructure and technical systems' },
      { id: 3, title: 'Health & Medical Sciences', description: 'Healthcare, medicine, and life sciences' },
      { id: 4, title: 'Agriculture & Environmental', description: 'Farming, ecology, and environmental protection' },
      { id: 5, title: 'Architecture & Urban Planning', description: 'Design buildings and cities' },
      { id: 6, title: 'Business & Economics', description: 'Lead in business, finance, and economics' },
      { id: 7, title: 'Education', description: 'Shape the next generation of learners' },
      { id: 8, title: 'Arts & Media', description: 'Creative arts, design, and media production' },
      { id: 9, title: 'Law & Legal Studies', description: 'Study law, justice, and governance' },
      { id: 10, title: 'Social Sciences', description: 'Understand society, politics, and human behavior' },
      { id: 11, title: 'Tourism & Hospitality', description: 'Travel, tourism, and hospitality management' },
      { id: 12, title: 'Languages & Literature', description: 'Master languages, linguistics, and literature' },
    ];

    console.log(`\n🧪 Testing custom model...`);

    const recommendations = await getCustomModelRecommendations(testStudent, MAJORS);

    res.json({
      success: true,
      message: '✅ Custom model test passed',
      testStudent,
      recommendations,
      model: process.env.HF_CUSTOM_MODEL || 'leangchheng27/Cambodia-Scholarship-Portal'
    });
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Test failed',
      error: error.message
    });
  }
});

export default router;

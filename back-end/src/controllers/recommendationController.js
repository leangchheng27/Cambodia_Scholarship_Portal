/**
 * Recommendation Controller
 * Handles API requests for AI-powered scholarship recommendations
 */

import { 
  calculateGPA, 
  analyzeStrongSubjects, 
  getPerformanceLevel,
  validateProfile
} from '../utils/ai/profileAnalyzer.js';
import { getRecommendedFields } from '../utils/ai/fieldMatcher.js';
import { 
  calculateUniversityMatchScore,
  getUniversityInternshipRecommendations 
} from '../utils/ai/universityMatcher.js';
import { 
  getScholarshipRecommendations 
} from '../services/ai/recommendationEngine.js';
import { 
  getAIRecommendations,
  getAIRecommendationsWithFeedback,
  precomputeScholarshipEmbeddings
} from '../services/ai/huggingface.js';

/**
 * Analyze user profile and return academic insights
 * POST /api/recommendations/analyze-profile
 * 
 * @param {Object} req.body - { studentType, grades }
 * @returns {Object} - { gpa, strongSubjects, performanceLevel, recommendedFields }
 */
const analyzeProfile = async (req, res) => {
  try {
    const { studentType, grades } = req.body;

    // Validate input
    if (!studentType || !grades) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: studentType and grades' 
      });
    }

    const validation = validateProfile({ studentType, grades });
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false,
        error: `Missing or invalid fields: ${validation.missingFields.join(', ')}` 
      });
    }

    // Analyze profile
    const gpa = calculateGPA(grades);
    const strongSubjects = analyzeStrongSubjects(grades);
    const performanceLevel = getPerformanceLevel(grades);
    const recommendedFields = getRecommendedFields(studentType, grades);

    return res.status(200).json({
      success: true,
      data: {
        gpa: parseFloat(gpa),
        strongSubjects,
        performanceLevel,
        recommendedFields: recommendedFields.slice(0, 10) // Top 10 recommendations
      }
    });

  } catch (error) {
    console.error('Error analyzing profile:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error while analyzing profile' 
    });
  }
};

/**
 * Get scholarship recommendations for a user
 * POST /api/recommendations/scholarships
 * 
 * @param {Object} req.body - { userProfile: { studentType, grades, gpa? }, scholarships, useAI?, limit? }
 * @returns {Object} - { recommendations: Array<Scholarship> }
 */
const getRecommendations = async (req, res) => {
  try {
    const { userProfile, scholarships, useAI = true, limit = 10 } = req.body;

    // Validate input
    if (!userProfile || !scholarships) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: userProfile and scholarships' 
      });
    }

    const validation = validateProfile(userProfile);
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false,
        error: `Missing or invalid fields: ${validation.missingFields.join(', ')}` 
      });
    }

    // Calculate GPA if not provided
    if (!userProfile.gpa) {
      userProfile.gpa = parseFloat(calculateGPA(userProfile.grades));
    }

    let recommendations;

    if (useAI) {
      // Fetch popularity map from the feedback table and blend with AI scores.
      // popularityMap is optional – if not provided by client, pass {} so the
      // AI score alone drives ranking.
      const popularityMap = req.body.popularityMap || {};
      recommendations = await getAIRecommendationsWithFeedback(
        userProfile, scholarships, limit, popularityMap
      );
    } else {
      // Use rule-based matching
      recommendations = getScholarshipRecommendations(userProfile, scholarships, limit);
    }

    return res.status(200).json({
      success: true,
      data: {
        recommendations,
        total: recommendations.length,
        method: useAI ? 'ai' : 'rule-based'
      }
    });

  } catch (error) {
    console.error('Error getting recommendations:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error while generating recommendations' 
    });
  }
};

/**
 * Analyze university student profile and get internship recommendations
 * POST /api/recommendations/university-profile
 * 
 * @param {Object} req.body - { universityProfile: { currentField, gpa }, opportunities }
 * @returns {Object} - { recommendations: Array<Opportunity> }
 */
const analyzeUniversityProfile = async (req, res) => {
  try {
    const { universityProfile, opportunities } = req.body;

    // Validate input
    if (!universityProfile || !opportunities) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: universityProfile and opportunities' 
      });
    }

    if (!universityProfile.currentField) {
      return res.status(400).json({ 
        success: false,
        error: 'universityProfile.currentField is required' 
      });
    }

    // Get recommendations
    const recommendations = getUniversityInternshipRecommendations(
      universityProfile,
      opportunities
    );

    return res.status(200).json({
      success: true,
      data: {
        recommendations,
        total: recommendations.length
      }
    });

  } catch (error) {
    console.error('Error analyzing university profile:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error while analyzing university profile' 
    });
  }
};

/**
 * Precompute embeddings for scholarships (admin/cron job)
 * POST /api/recommendations/precompute-embeddings
 * 
 * @param {Object} req.body - { scholarships }
 * @returns {Object} - { success: true, cached: number }
 */
const precomputeEmbeddings = async (req, res) => {
  try {
    const { scholarships } = req.body;

    if (!scholarships || !Array.isArray(scholarships)) {
      return res.status(400).json({ 
        success: false,
        error: 'scholarships array is required' 
      });
    }

    // This is a heavy operation - should be protected by auth middleware
    const embeddingsCache = await precomputeScholarshipEmbeddings(scholarships);

    return res.status(200).json({
      success: true,
      data: {
        cached: Object.keys(embeddingsCache).length,
        total: scholarships.length
      }
    });

  } catch (error) {
    console.error('Error precomputing embeddings:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error while precomputing embeddings' 
    });
  }
};

export {
  analyzeProfile,
  getRecommendations,
  analyzeUniversityProfile,
  precomputeEmbeddings
};

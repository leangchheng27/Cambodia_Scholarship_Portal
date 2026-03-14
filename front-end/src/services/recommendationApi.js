/**
 * Recommendation API Service
 * Handles all AI recommendation-related API calls
 */

import API from './api';

/**
 * Analyze user profile and get academic insights
 * @param {Object} data - { studentType, grades }
 * @returns {Promise<Object>} - { gpa, strongSubjects, performanceLevel, recommendedFields }
 */
export const analyzeProfile = async (studentType, grades) => {
  try {
    const response = await API.post('/recommendations/analyze-profile', {
      studentType,
      grades
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing profile:', error);
    throw error;
  }
};

/**
 * Get scholarship recommendations for a user
 * @param {Object} userProfile - { studentType, grades, gpa }
 * @param {Array} scholarships - List of scholarships to match against
 * @param {boolean} useAI - Whether to use AI-powered matching
 * @param {number} limit - Maximum number of recommendations
 * @returns {Promise<Object>} - { recommendations, total, method }
 */
export const getScholarshipRecommendations = async (
  userProfile,
  scholarships,
  useAI = true,
  limit = 10
) => {
  try {
    const response = await API.post('/recommendations/scholarships', {
      userProfile,
      scholarships,
      useAI,
      limit
    });
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

/**
 * Analyze university student profile for internship recommendations
 * @param {Object} universityProfile - { currentField, gpa }
 * @param {Array} opportunities - List of opportunities
 * @returns {Promise<Object>} - { recommendations, total }
 */
export const analyzeUniversityProfile = async (universityProfile, opportunities) => {
  try {
    const response = await API.post('/recommendations/university-profile', {
      universityProfile,
      opportunities
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing university profile:', error);
    throw error;
  }
};

/**
 * Precompute embeddings for scholarships (admin only)
 * @param {Array} scholarships - List of scholarships
 * @returns {Promise<Object>} - { cached, total }
 */
export const precomputeEmbeddings = async (scholarships) => {
  try {
    const response = await API.post('/recommendations/precompute-embeddings', {
      scholarships
    });
    return response.data;
  } catch (error) {
    console.error('Error precomputing embeddings:', error);
    throw error;
  }
};

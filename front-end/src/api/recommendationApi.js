import API from '../services/api';

// ============================================
// Custom Hugging Face Model Integration
// Uses leangchheng27/Cambodia-Scholarship-Portal
// ============================================

/**
 * Get major recommendations using the custom Hugging Face model
 */
export const getCustomModelRecommendations = async (studentProfile, scholarships, limit = 10) => {
  try {
    console.log('🤖 [Frontend] Calling custom model recommendations...');
    const response = await API.post('/recommendations/custom/recommend', {
      studentProfile,
      scholarships,
      limit,
    });
    console.log('✅ [Frontend] Custom model response received');
    return response.data;
  } catch (error) {
    console.error('❌ Error getting custom model recommendations:', error);
    throw error;
  }
};

/**
 * Check the health/status of the custom model service
 */
export const checkCustomModelHealth = async () => {
  try {
    const response = await API.get('/recommendations/custom/health');
    return response.data;
  } catch (error) {
    console.error('Error checking custom model health:', error);
    throw error;
  }
};

/**
 * Test the custom model with sample data
 */
export const testCustomModel = async () => {
  try {
    console.log('🧪 [Frontend] Testing custom model...');
    const response = await API.post('/recommendations/custom/test');
    console.log('✅ [Frontend] Custom model test passed');
    return response.data;
  } catch (error) {
    console.error('❌ [Frontend] Custom model test failed:', error);
    throw error;
  }
};

/**
 * Get scholarships filtered by major fields
 * Takes the top 5 majors and returns all scholarships matching those fields
 * @param {Array} majorTitles - Array of major titles (e.g., ["Engineering", "IT & Computer Science"])
 * @returns {Promise<Object>} - { success, scholarships: Array }
 */
export const getScholarshipsByMajorFields = async (majorTitles) => {
  try {
    console.log('🎓 [Frontend] Getting scholarships for majors:', majorTitles);
    const response = await API.post('/recommendations/scholarships-by-fields', {
      majorTitles,
    });
    console.log('✅ [Frontend] Scholarships filtered by majors:', response.data.scholarships?.length || 0);
    return response.data;
  } catch (error) {
    console.error('❌ Error getting scholarships by major fields:', error);
    throw error;
  }
};

/**
 * Get internship recommendations for a university student based on field of study
 * @param {string} userField - Student's field of study (e.g., "IT & Computer Science")
 * @param {number} limit - Maximum number of recommendations to return (default: 10)
 * @returns {Promise<Object>} - { success, recommendations: Array, total: number, userField: string }
 */
export const getInternshipRecommendations = async (userField, limit = 10) => {
  try {
    console.log('🎯 [Frontend] Getting internship recommendations for field:', userField);
    const response = await API.post('/internships/recommendations', {
      userField,
      limit,
    });
    console.log('✅ [Frontend] Internship recommendations received:', response.data.recommendations?.length || 0);
    return response.data;
  } catch (error) {
    console.error('❌ Error getting internship recommendations:', error);
    throw error;
  }
};

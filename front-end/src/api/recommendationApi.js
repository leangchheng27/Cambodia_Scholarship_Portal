import API from '../services/api';

export const analyzeProfile = async (studentType, grades) => {
  try {
    const response = await API.post('/recommendations/analyze-profile', { studentType, grades });
    return response.data;
  } catch (error) {
    console.error('Error analyzing profile:', error);
    throw error;
  }
};

export const getScholarshipRecommendations = async (userProfile, scholarships, useAI = true, limit = 10) => {
  try {
    const response = await API.post('/recommendations/scholarships', {
      userProfile,
      scholarships,
      useAI,
      limit,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export const analyzeUniversityProfile = async (universityProfile, opportunities) => {
  try {
    const response = await API.post('/recommendations/university-profile', {
      universityProfile,
      opportunities,
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing university profile:', error);
    throw error;
  }
};

export const precomputeEmbeddings = async (scholarships) => {
  try {
    const response = await API.post('/recommendations/precompute-embeddings', { scholarships });
    return response.data;
  } catch (error) {
    console.error('Error precomputing embeddings:', error);
    throw error;
  }
};

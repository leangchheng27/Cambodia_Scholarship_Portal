/**
 * Frontend utility functions for profile calculations
 */
import { getScholarshipRecommendations as apiGetRecommendations } from '../api/recommendationApi';

/**
 * List of subjects available in the system
 */
export const SUBJECTS = {
  science: [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Khmer',
    'English',
    'Physical Education',
    'History',
    'Geography',
    'Moral-Civics Education',
    'Earth & Environmental Science',
  ],
  social: [
    'Mathematics',
    'Accounting',
    'Economy',
    'Management',
    'Khmer',
    'English',
    'Physical Education',
    'History',
    'Geography',
    'Moral-Civics Education',
  ],
};

/**
 * Calculate GPA from grades object
 * @param {Object} grades - Object with subject names as keys and grades as values
 * @returns {number} - Calculated GPA (0-4 scale)
 */
export function calculateGPA(grades) {
  if (!grades || Object.keys(grades).length === 0) {
    return 0;
  }

  // Map letter grades to GPA points
  const gradePoints = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'E': 0.5,
    'F': 0.0,
  };

  const values = Object.values(grades);
  const total = values.reduce((sum, grade) => {
    // Handle both letter grades and numeric inputs
    const point = typeof grade === 'string' ? (gradePoints[grade.toUpperCase()] || 0) : parseFloat(grade) || 0;
    return sum + point;
  }, 0);

  return (total / values.length).toFixed(2);
}

/**
 * Analyze which subjects a student is strong in
 * @param {Object} grades - Object with subject names as keys and grades as values
 * @returns {Array<string>} - Array of subject names where student excels
 */
export function analyzeStrongSubjects(grades) {
  if (!grades || Object.keys(grades).length === 0) {
    return [];
  }

  const gradeValues = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'E': 0.5,
    'F': 0.0,
  };

  const strongSubjects = [];
  
  for (const [subject, grade] of Object.entries(grades)) {
    const numericGrade = typeof grade === 'string' ? (gradeValues[grade.toUpperCase()] || 0) : parseFloat(grade) || 0;
    // Consider B grade (3.0) and above as strong
    if (numericGrade >= 3.0) {
      strongSubjects.push(subject);
    }
  }

  return strongSubjects;
}

/**
 * Get AI-powered scholarship recommendations
 * @param {Object} userProfile - User profile data with grades and GPA
 * @param {Array} scholarships - List of scholarships to match against
 * @param {number} limit - Maximum number of recommendations (default: 10)
 * @returns {Promise<Array>} - Array of recommended scholarships with match scores
 */
export async function getAIRecommendations(userProfile, scholarships, limit = 10) {
  console.log('getAIRecommendations called with:', { 
    userProfile, 
    scholarshipsCount: scholarships.length, 
    limit 
  });
  
  try {
    console.log('Sending request to backend...');
    const data = await apiGetRecommendations(userProfile, scholarships, limit);
    
    // Check if backend returned success
    if (data.success && data.data?.recommendations) {
      console.log(`✅ Backend returned ${data.data.recommendations.length} recommendations`);
      const sorted = data.data.recommendations.sort((a, b) => b.matchScore - a.matchScore);
      return sorted;
    }
    
    // If response doesn't have the expected structure, throw error
    throw new Error('Invalid backend response format');
  } catch (error) {
    console.error('❌ AI recommendation error:', error.message);
    // NO FALLBACK - Error propagates to caller
    throw error;
  }
}

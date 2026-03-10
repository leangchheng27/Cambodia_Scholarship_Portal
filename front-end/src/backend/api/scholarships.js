/**
 * Scholarship API Controllers
 * Handles scholarship-related API endpoints
 */

import { getScholarshipRecommendations } from '../services/ai/recommendationEngine.js';
import { getAIRecommendations } from '../services/ai/huggingface.js';

/**
 * Get personalized scholarship recommendations
 * @param {Object} userProfile - User's academic profile
 * @param {Array} scholarships - List of available scholarships
 * @param {Object} options - Additional options (useAI, limit, etc.)
 * @returns {Promise<Array>} - List of recommended scholarships
 */
export async function getRecommendations(userProfile, scholarships, options = {}) {
  const {
    useAI = true,
    limit = 10
  } = options;
  
  try {
    if (useAI) {
      // Try AI-powered recommendations first
      return await getAIRecommendations(userProfile, scholarships, limit);
    } else {
      // Use rule-based recommendations
      return getScholarshipRecommendations(userProfile, scholarships, limit);
    }
  } catch (error) {
    console.error('Error getting recommendations:', error);
    // Fallback to rule-based if AI fails
    return getScholarshipRecommendations(userProfile, scholarships, limit);
  }
}

/**
 * Filter scholarships by criteria
 * @param {Array} scholarships - List of scholarships
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered scholarships
 */
export function filterScholarships(scholarships, filters) {
  let filtered = [...scholarships];
  
  // Filter by student type
  if (filters.studentType && filters.studentType !== 'both') {
    filtered = filtered.filter(s => 
      s.aiMetadata?.studentTypes?.includes(filters.studentType) ||
      s.aiMetadata?.studentTypes?.includes('both')
    );
  }
  
  // Filter by field of study
  if (filters.field) {
    filtered = filtered.filter(s =>
      s.aiMetadata?.fieldCategories?.some(cat =>
        cat.toLowerCase().includes(filters.field.toLowerCase())
      )
    );
  }
  
  // Filter by minimum GPA
  if (filters.minGPA) {
    filtered = filtered.filter(s =>
      !s.aiMetadata?.minGPA || s.aiMetadata.minGPA <= filters.minGPA
    );
  }
  
  // Filter by difficulty level
  if (filters.difficultyLevel) {
    filtered = filtered.filter(s =>
      s.aiMetadata?.difficultyLevel === filters.difficultyLevel
    );
  }
  
  // Search by keywords
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(s =>
      s.title?.toLowerCase().includes(term) ||
      s.description?.toLowerCase().includes(term) ||
      s.aiMetadata?.keywords?.some(k => k.toLowerCase().includes(term))
    );
  }
  
  return filtered;
}

/**
 * Get scholarship statistics
 * @param {Array} scholarships - List of scholarships
 * @returns {Object} - Statistics object
 */
export function getScholarshipStats(scholarships) {
  const stats = {
    total: scholarships.length,
    bystudentType: {
      science: 0,
      society: 0,
      both: 0
    },
    byDifficulty: {
      easy: 0,
      moderate: 0,
      competitive: 0,
      'very-competitive': 0
    },
    averageMinGPA: 0
  };
  
  let gpaSum = 0;
  let gpaCount = 0;
  
  scholarships.forEach(s => {
    // Count by student type
    if (s.aiMetadata?.studentTypes) {
      s.aiMetadata.studentTypes.forEach(type => {
        if (stats.bystudentType[type] !== undefined) {
          stats.bystudentType[type]++;
        }
      });
    }
    
    // Count by difficulty
    if (s.aiMetadata?.difficultyLevel) {
      const diff = s.aiMetadata.difficultyLevel;
      if (stats.byDifficulty[diff] !== undefined) {
        stats.byDifficulty[diff]++;
      }
    }
    
    // Calculate average GPA
    if (s.aiMetadata?.minGPA) {
      gpaSum += s.aiMetadata.minGPA;
      gpaCount++;
    }
  });
  
  stats.averageMinGPA = gpaCount > 0 ? (gpaSum / gpaCount).toFixed(2) : 0;
  
  return stats;
}

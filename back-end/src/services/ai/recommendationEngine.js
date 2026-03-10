/**
 * Core Recommendation Engine
 * Rule-based scholarship matching algorithm
 */

import { MATCH_WEIGHTS } from '../../config/ai/constants.js';
import { calculateGPA, analyzeStrongSubjects } from '../../utils/ai/profileAnalyzer.js';
import { getRecommendedFields, getMatchingFields } from '../../utils/ai/fieldMatcher.js';

/**
 * Calculate match score between user profile and scholarship
 * Returns a score from 0-100 based on multiple factors
 * @param {Object} userProfile - User's academic profile
 * @param {Object} scholarship - Scholarship object with aiMetadata
 * @returns {number} - Match score (0-100)
 */
function calculateMatchScore(userProfile, scholarship) {
  let score = 0;
  const maxScore = 100;
  
  // 1. Check student type compatibility (20 points)
  if (scholarship.aiMetadata?.studentTypes) {
    if (scholarship.aiMetadata.studentTypes.includes(userProfile.studentType) || 
        scholarship.aiMetadata.studentTypes.includes('both')) {
      score += MATCH_WEIGHTS.STUDENT_TYPE;
    }
  } else {
    score += MATCH_WEIGHTS.STUDENT_TYPE / 2; // Partial credit if not specified
  }
  
  // 2. Check field of study match (40 points)
  const recommendedFields = getRecommendedFields(userProfile.studentType, userProfile.grades);
  if (scholarship.aiMetadata?.fieldCategories) {
    const matchingFields = getMatchingFields(recommendedFields, scholarship.aiMetadata.fieldCategories);
    score += Math.min(MATCH_WEIGHTS.FIELD_MATCH, matchingFields.length * 10);
  }
  
  // 3. Check GPA requirements (20 points)
  const gpa = parseFloat(calculateGPA(userProfile.grades));
  if (scholarship.aiMetadata?.minGPA) {
    if (gpa >= scholarship.aiMetadata.minGPA) {
      score += MATCH_WEIGHTS.GPA_REQUIREMENT;
    } else if (gpa >= scholarship.aiMetadata.minGPA - 0.5) {
      score += MATCH_WEIGHTS.GPA_REQUIREMENT / 2; // Close to requirement
    }
  } else {
    score += MATCH_WEIGHTS.GPA_REQUIREMENT * 0.75; // Partial credit if not specified
  }
  
  // 4. Check required subjects (20 points)
  if (scholarship.aiMetadata?.requiredSubjects) {
    const userStrongSubjects = analyzeStrongSubjects(userProfile.grades);
    const matchingSubjects = scholarship.aiMetadata.requiredSubjects.filter(subject =>
      userStrongSubjects.includes(subject)
    );
    const subjectMatchRatio = matchingSubjects.length / scholarship.aiMetadata.requiredSubjects.length;
    score += Math.round(MATCH_WEIGHTS.REQUIRED_SUBJECTS * subjectMatchRatio);
  } else {
    score += MATCH_WEIGHTS.REQUIRED_SUBJECTS / 2; // Partial credit if not specified
  }
  
  return Math.min(maxScore, Math.round(score));
}

/**
 * Generate human-readable reasons for the match
 * @param {Object} userProfile - User's profile
 * @param {Object} scholarship - Scholarship object
 * @returns {string[]} - Array of match reason strings
 */
function generateMatchReasons(userProfile, scholarship) {
  const reasons = [];
  const recommendedFields = getRecommendedFields(userProfile.studentType, userProfile.grades);
  const strongSubjects = analyzeStrongSubjects(userProfile.grades);
  const gpa = calculateGPA(userProfile.grades);
  
  // Field match reason
  if (scholarship.aiMetadata?.fieldCategories) {
    const matchingFields = getMatchingFields(recommendedFields, scholarship.aiMetadata.fieldCategories);
    if (matchingFields.length > 0) {
      reasons.push(`Your strong ${strongSubjects.join(' & ')} skills match this ${matchingFields[0]} program`);
    }
  }
  
  // GPA reason
  if (parseFloat(gpa) >= 3.5) {
    reasons.push(`Your excellent GPA (${gpa}) qualifies you`);
  } else if (parseFloat(gpa) >= 3.0) {
    reasons.push(`Your good GPA (${gpa}) meets requirements`);
  }
  
  // Subject reason
  if (strongSubjects.length >= 3) {
    reasons.push(`You excel in ${strongSubjects.length} subjects`);
  }
  
  return reasons;
}

/**
 * Get scholarship recommendations for a user
 * Returns scholarships sorted by match score
 * @param {Object} userProfile - User's academic profile
 * @param {Array} scholarships - List of available scholarships
 * @param {number} limit - Maximum number of recommendations to return
 * @returns {Array} - Sorted array of scholarships with match scores
 */
function getScholarshipRecommendations(userProfile, scholarships, limit = 10) {
  // Calculate match score for each scholarship
  const scoredScholarships = scholarships.map(scholarship => ({
    ...scholarship,
    matchScore: calculateMatchScore(userProfile, scholarship),
    matchReasons: generateMatchReasons(userProfile, scholarship)
  }));
  
  // Sort by match score (highest first)
  scoredScholarships.sort((a, b) => b.matchScore - a.matchScore);
  
  // Return top matches
  return scoredScholarships.slice(0, limit);
}

/**
 * Get text description for scholarship (used in AI embeddings)
 * Combines all relevant scholarship information into a single string
 * @param {Object} scholarship - Scholarship object
 * @returns {string} - Text representation of scholarship
 */
function getScholarshipEmbeddingText(scholarship) {
  const parts = [
    scholarship.title,
    scholarship.description,
    scholarship.details?.title || '',
    scholarship.details?.subtitle || '',
    scholarship.details?.fieldsOfStudy || '',
    scholarship.aiMetadata?.fieldCategories?.join(', ') || '',
    scholarship.aiMetadata?.requiredSubjects?.join(', ') || '',
    scholarship.details?.programs?.join(', ') || ''
  ];
  
  return parts.filter(Boolean).join('. ');
}

/**
 * Get text description for user profile (used in AI embeddings)
 * @param {Object} userProfile - User profile object
 * @returns {string} - Text representation of user profile
 */
function getUserProfileEmbeddingText(userProfile) {
  const strongSubjects = analyzeStrongSubjects(userProfile.grades);
  const recommendedFields = getRecommendedFields(userProfile.studentType, userProfile.grades);
  const gpa = calculateGPA(userProfile.grades);
  
  return `${userProfile.studentType} student with GPA ${gpa}. Strong in ${strongSubjects.join(', ')}. Interested in ${recommendedFields.slice(0, 5).join(', ')}.`;
}

export {
  calculateMatchScore,
  generateMatchReasons,
  getScholarshipRecommendations,
  getScholarshipEmbeddingText,
  getUserProfileEmbeddingText
};

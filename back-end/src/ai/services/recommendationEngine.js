/**
 * Core Recommendation Engine
 * Rule-based scholarship matching algorithm
 */

import { MATCH_WEIGHTS } from '../config/constants.js';
import { calculateGPA, analyzeStrongSubjects } from '../utils/profileAnalyzer.js';
import { getRecommendedFields, getMatchingFields } from '../utils/fieldMatcher.js';

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
  // STAGE 1: Filter by hard eligibility requirements (MUST MEET)
  const userGPA = parseFloat(calculateGPA(userProfile.grades));
  const eligibleScholarships = scholarships.filter(scholarship => {
    // Check GPA requirement (hard constraint)
    if (scholarship.aiMetadata?.minGPA) {
      if (userGPA < scholarship.aiMetadata.minGPA) {
        return false; // User doesn't meet GPA requirement - EXCLUDE
      }
    }
    
    // Check student type eligibility
    if (scholarship.aiMetadata?.studentTypes) {
      if (!scholarship.aiMetadata.studentTypes.includes(userProfile.studentType) && 
          !scholarship.aiMetadata.studentTypes.includes('both')) {
        return false; // Wrong student type - EXCLUDE
      }
    }
    
    return true; // Meets all hard constraints
  });
  
  // STAGE 2: Score eligible scholarships only
  const scoredScholarships = eligibleScholarships.map(scholarship => ({
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
 * Map Cambodian subjects to descriptive phrases for better AI understanding
 */
const SUBJECT_DESCRIPTORS = {
  'Mathematics': 'logical reasoning and quantitative analysis',
  'Math': 'logical reasoning and quantitative analysis',
  'Physics': 'physics and physical sciences',
  'Chemistry': 'chemistry and molecular sciences',
  'Biology': 'biological sciences and life sciences',
  'Khmer': 'language studies, writing, and humanities',
  'Khmer Literature': 'language studies, writing, and humanities',
  'English': 'english language, communication, and linguistics',
  'Physical Education': 'sports science and physical development',
  'History': 'history, social sciences, and humanities',
  'Geography': 'geography, environmental studies, and earth sciences',
  'Moral-Civics Education': 'ethics, social development, and civic responsibility',
  'Earth & Environmental Science': 'earth sciences, environmental studies, and sustainability',
  'Accounting': 'accounting, finance, and business management',
  'Economy': 'economics, business studies, and market analysis',
  'Management': 'management, organizational studies, and business administration'
};

/**
 * Get text description for user profile (used in AI embeddings)
 * Uses letter grades + subject descriptors for Cambodian subject understanding
 * @param {Object} userProfile - User profile object with grades (A-F letters)
 * @returns {string} - Text representation of user profile for AI matching
 */
function getUserProfileEmbeddingText(userProfile) {
  // Build profile from letter grades with descriptive phrases
  const gradeDescriptions = [];
  
  if (userProfile.grades && typeof userProfile.grades === 'object') {
    Object.entries(userProfile.grades)
      .filter(([_, grade]) => grade) // Only include subjects with grades
      .forEach(([subject, grade]) => {
        const descriptivePhrase = SUBJECT_DESCRIPTORS[subject] || subject;
        gradeDescriptions.push(`${descriptivePhrase} (grade ${grade})`);
      });
  }
  
  // Build profile text with academic stream + grades
  const academicStream = userProfile.studentType === 'science' ? 'Science student' : 'Society student';
  const gradesText = gradeDescriptions.length > 0 
    ? gradeDescriptions.join(', ')
    : 'academic studies';
  
  return `${academicStream} with strengths in ${gradesText}. Seeking scholarships that match their academic profile and interests.`;
}

export {
  calculateMatchScore,
  generateMatchReasons,
  getScholarshipRecommendations,
  getScholarshipEmbeddingText,
  getUserProfileEmbeddingText
};

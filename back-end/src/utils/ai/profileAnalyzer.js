/**
 * Profile Analysis Utilities
 * Analyzes student profiles and calculates metrics
 */

import { GRADE_POINTS } from '../../config/ai/constants.js';

/**
 * Analyze student's strong subjects (grades A or B)
 * @param {Object} grades - Object with subject names as keys and grades as values
 * @returns {string[]} - Array of subject names where student has A or B grades
 */
function analyzeStrongSubjects(grades) {
  const strongSubjects = [];
  
  for (const [subject, grade] of Object.entries(grades)) {
    if (grade === 'A' || grade === 'B') {
      strongSubjects.push(subject);
    }
  }
  
  return strongSubjects;
}

/**
 * Calculate GPA from grades
 * @param {Object} grades - Object with subject names as keys and grades as values
 * @returns {number} - GPA on 4.0 scale
 */
function calculateGPA(grades) {
  const gradeValues = Object.values(grades).map(grade => GRADE_POINTS[grade] || 0);
  if (gradeValues.length === 0) {
    return 0.0;
  }
  const sum = gradeValues.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / gradeValues.length).toFixed(2));
}

/**
 * Get academic performance level
 * @param {number} gpa - Student's GPA
 * @returns {string} - Performance level description
 */
function getPerformanceLevel(gpa) {
  if (gpa >= 3.7) return 'Excellent';
  if (gpa >= 3.3) return 'Very Good';
  if (gpa >= 3.0) return 'Good';
  if (gpa >= 2.5) return 'Satisfactory';
  return 'Needs Improvement';
}

/**
 * Validate user profile completeness
 * @param {Object} userProfile - User profile object
 * @returns {Object} - Validation result with isValid and missing fields
 */
function validateProfile(userProfile) {
  const requiredFields = ['studentType', 'grades'];
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!userProfile[field]) {
      missingFields.push(field);
    }
  }
  
  // Check if grades object has at least one entry
  if (userProfile.grades && Object.keys(userProfile.grades).length === 0) {
    missingFields.push('grades (at least one subject)');
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

export {
  analyzeStrongSubjects,
  calculateGPA,
  getPerformanceLevel,
  validateProfile
};

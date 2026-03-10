/**
 * Field Matching Utilities
 * Maps student subjects to recommended fields of study
 */

import { SUBJECT_FIELD_MAPPING } from '../config/constants.js';
import { analyzeStrongSubjects } from './profileAnalyzer.js';

/**
 * Get recommended fields based on strong subject combinations
 * @param {string} studentType - 'science' or 'society'
 * @param {Object} grades - Object with subject grades
 * @returns {string[]} - Array of recommended field names
 */
export function getRecommendedFields(studentType, grades) {
  const strongSubjects = analyzeStrongSubjects(grades);
  const mapping = SUBJECT_FIELD_MAPPING[studentType] || {};
  const recommendedFields = new Set();
  
  // Check for subject combinations (pairs)
  const combinations = [
    strongSubjects.length >= 2 ? `${strongSubjects[0]}-${strongSubjects[1]}` : null,
    strongSubjects.length >= 2 ? `${strongSubjects[1]}-${strongSubjects[0]}` : null,
    ...strongSubjects
  ].filter(Boolean);
  
  for (const combo of combinations) {
    const fields = mapping[combo];
    if (fields) {
      fields.forEach(field => recommendedFields.add(field));
    }
  }
  
  // If no combinations found, check individual subjects
  if (recommendedFields.size === 0) {
    strongSubjects.forEach(subject => {
      const fields = mapping[subject];
      if (fields) {
        fields.forEach(field => recommendedFields.add(field));
      }
    });
  }
  
  return Array.from(recommendedFields);
}

/**
 * Check if a field matches any of the recommended fields
 * @param {string} field - Field to check
 * @param {string[]} recommendedFields - Array of recommended fields
 * @returns {boolean} - True if there's a match
 */
export function isFieldMatch(field, recommendedFields) {
  return recommendedFields.some(recField => 
    recField.toLowerCase().includes(field.toLowerCase()) || 
    field.toLowerCase().includes(recField.toLowerCase())
  );
}

/**
 * Get matching fields between recommended and scholarship fields
 * @param {string[]} recommendedFields - Student's recommended fields
 * @param {string[]} scholarshipFields - Scholarship's field categories
 * @returns {string[]} - Array of matching fields
 */
export function getMatchingFields(recommendedFields, scholarshipFields) {
  if (!scholarshipFields || scholarshipFields.length === 0) {
    return [];
  }
  
  return recommendedFields.filter(field => 
    scholarshipFields.some(category => 
      category.toLowerCase().includes(field.toLowerCase()) || 
      field.toLowerCase().includes(category.toLowerCase())
    )
  );
}

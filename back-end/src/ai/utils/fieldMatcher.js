/**
 * Field Matching Utilities
 * Maps student subjects to recommended fields of study
 */

import { SUBJECT_FIELD_MAPPING } from '../config/constants.js';
import { analyzeStrongSubjects } from './profileAnalyzer.js';

const SUBJECT_ALIASES = {
  math: 'Math',
  mathematics: 'Math',
  khmer: 'Khmer Literature',
  'khmer literature': 'Khmer Literature',
  morality: 'Morality',
  'moral-civics education': 'Morality',
  'moral civics education': 'Morality',
  'earth & environmental science': 'Earth Science',
  'earth and environmental science': 'Earth Science',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  history: 'History',
  geography: 'Geography',
  english: 'English',
  accounting: 'Math',
  economy: 'Math',
  management: 'Morality',
};

const normalizeSubjectName = (subject) => {
  const trimmed = String(subject || '').trim();
  if (!trimmed) return '';

  return SUBJECT_ALIASES[trimmed.toLowerCase()] || trimmed;
};

/**
 * Get recommended fields based on strong subject combinations
 * @param {string} studentType - 'science' or 'society'
 * @param {Object} grades - Object with subject grades
 * @returns {string[]} - Array of recommended field names
 */
function getRecommendedFields(studentType, grades) {
  const strongSubjects = Array.from(
    new Set(analyzeStrongSubjects(grades).map(normalizeSubjectName).filter(Boolean))
  );
  const mapping = SUBJECT_FIELD_MAPPING[studentType] || {};
  const recommendedFields = new Set();
  
  // Check for all possible subject combinations (pairs)
  if (strongSubjects.length >= 2) {
    for (let i = 0; i < strongSubjects.length; i++) {
      for (let j = i + 1; j < strongSubjects.length; j++) {
        const combo1 = `${strongSubjects[i]}-${strongSubjects[j]}`;
        const combo2 = `${strongSubjects[j]}-${strongSubjects[i]}`;
        
        if (mapping[combo1]) {
          mapping[combo1].forEach(field => recommendedFields.add(field));
        }
        if (mapping[combo2]) {
          mapping[combo2].forEach(field => recommendedFields.add(field));
        }
      }
    }
  }
  
  // Also check individual subjects
  strongSubjects.forEach(subject => {
    const fields = mapping[subject];
    if (fields) {
      fields.forEach(field => recommendedFields.add(field));
    }
  });
  
  return Array.from(recommendedFields);
}

/**
 * Check if a field matches any of the recommended fields
 * @param {string} field - Field to check
 * @param {string[]} recommendedFields - Array of recommended fields
 * @returns {boolean} - True if there's a match
 */
function isFieldMatch(field, recommendedFields) {
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
function getMatchingFields(recommendedFields, scholarshipFields) {
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

export {
  getRecommendedFields,
  isFieldMatch,
  getMatchingFields
};

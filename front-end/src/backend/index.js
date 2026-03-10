/**
 * Backend API Index
 * Central export point for all backend services
 */

// AI Services
export {
  getAIRecommendations,
  generateEmbedding,
  precomputeScholarshipEmbeddings,
  getCachedEmbeddings,
  clearEmbeddingsCache
} from './services/ai/huggingface.js';

export {
  calculateMatchScore,
  generateMatchReasons,
  getScholarshipRecommendations,
  getScholarshipEmbeddingText,
  getUserProfileEmbeddingText
} from './services/ai/recommendationEngine.js';

// Utilities
export {
  analyzeStrongSubjects,
  calculateGPA,
  getPerformanceLevel,
  validateProfile
} from './utils/profileAnalyzer.js';

export {
  getRecommendedFields,
  isFieldMatch,
  getMatchingFields
} from './utils/fieldMatcher.js';

export {
  matchesUniversityField,
  calculateUniversityMatchScore,
  getUniversityInternshipRecommendations,
  generateUniversityMatchReasons
} from './utils/universityMatcher.js';

// Constants
export {
  SUBJECT_FIELD_MAPPING,
  GRADE_POINTS,
  SUBJECTS,
  UNIVERSITY_FIELDS,
  AI_CONFIG,
  MATCH_WEIGHTS,
  MATCH_THRESHOLDS
} from './config/constants.js';

/**
 * AI Backend Configuration Constants
 * Contains mapping rules and constants for the recommendation engine
 */

// Subject to Field Mapping Rules
const SUBJECT_FIELD_MAPPING = {
  // Science Student Mappings
  science: {
    'Math-Physics': ['Engineering', 'Architecture', 'Computer Science', 'Data Science', 'Aerospace Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
    'Math-Chemistry': ['Chemical Engineering', 'Pharmaceutical Sciences', 'Materials Science', 'Environmental Engineering'],
    'Biology-Chemistry': ['Medicine', 'Pharmacy', 'Biotechnology', 'Nursing', 'Veterinary Medicine', 'Biochemistry', 'Health Sciences'],
    'Biology-Physics': ['Biomedical Engineering', 'Medical Physics', 'Biophysics'],
    'Math-English': ['Computer Science', 'Information Technology', 'Business Analytics', 'Economics', 'International Business'],
    'Physics-Chemistry': ['Materials Engineering', 'Nanotechnology', 'Energy Engineering', 'Industrial Engineering'],
    'Math-Khmer Literature': ['Education', 'Teaching', 'Business Administration', 'Social Sciences'],
    'Math-History': ['Economics', 'Business', 'Social Sciences', 'International Relations'],
    'Biology-Khmer Literature': ['Biology Education', 'Science Communication', 'Health Education'],
    'Math': ['Mathematics', 'Statistics', 'Actuarial Science', 'Finance', 'Economics'],
    'Biology': ['Biology', 'Environmental Science', 'Agriculture', 'Forestry', 'Marine Biology'],
    'Physics': ['Physics', 'Applied Physics', 'Electronics'],
    'Chemistry': ['Chemistry', 'Forensic Science', 'Food Science'],
    'Khmer Literature': ['Khmer Literature', 'Education', 'Teaching', 'Linguistics'],
    'History': ['History', 'Social Sciences', 'Education']
  },
  
  // Society Student Mappings
  society: {
    'Math-Geography': ['Economics', 'Urban Planning', 'Environmental Management', 'Tourism Management', 'Real Estate'],
    'History-Geography': ['Tourism', 'International Relations', 'Cultural Studies', 'Anthropology', 'Archaeology'],
    'English-History': ['Law', 'Journalism', 'Communication Studies', 'International Relations', 'Political Science', 'Diplomacy'],
    'English-Geography': ['International Business', 'Tourism', 'Hotel Management', 'Event Management'],
    'Math-Morality': ['Business Administration', 'Management', 'Human Resources', 'Social Work'],
    'Geography-Earth Science': ['Environmental Science', 'Geology', 'Climate Studies', 'Natural Resource Management'],
    'History-Morality': ['Education', 'Philosophy', 'Religious Studies', 'Social Work', 'Counseling'],
    'Khmer Literature-History': ['Cultural Studies', 'Khmer Studies', 'Heritage Conservation', 'Education'],
    'Khmer Literature-English': ['Translation', 'Linguistics', 'Comparative Literature', 'Education'],
    'Khmer Literature-Geography': ['Cultural Geography', 'Tourism', 'Heritage Management'],
    'English': ['English Literature', 'Translation', 'TESOL', 'Linguistics', 'Media Studies'],
    'Math': ['Business', 'Accounting', 'Finance', 'Economics', 'Banking'],
    'History': ['History', 'Museum Studies', 'Heritage Conservation'],
    'Geography': ['Geography', 'Cartography', 'GIS Technology'],
    'Morality': ['Psychology', 'Sociology', 'Social Work', 'Public Administration'],
    'Khmer Literature': ['Khmer Literature', 'Education', 'Linguistics', 'Cultural Studies'],
    'Earth Science': ['Environmental Science', 'Geology', 'Earth Sciences', 'Climate Studies']
  }
};

// Grade point conversion
const GRADE_POINTS = {
  'A': 4.0,
  'B': 3.0,
  'C': 2.0,
  'D': 1.0,
  'E': 0.5,
  'F': 0.0
};

// Subject names for each student type
const SUBJECTS = {
  science: ['Math', 'Biology', 'Khmer Literature', 'Physics', 'Chemistry', 'History', 'English'],
  society: ['Math', 'History', 'Khmer Literature', 'Geography', 'Morality', 'Earth Science', 'English']
};

// University Fields/Majors for college/university students
const UNIVERSITY_FIELDS = [
  'Computer Science', 'Software Engineering', 'Information Technology', 'Data Science',
  'Artificial Intelligence', 'Cybersecurity', 'Civil Engineering', 'Mechanical Engineering',
  'Electrical Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Industrial Engineering',
  'Business Administration', 'Management', 'Finance', 'Accounting', 'Economics', 'Banking',
  'Marketing', 'International Business', 'Entrepreneurship', 'Human Resources',
  'Management Consulting', 'Strategy', 'Business Analytics', 'Operations Management',
  'Medicine', 'Nursing', 'Pharmacy', 'Public Health', 'Health Sciences', 'Biotechnology',
  'Biomedical Engineering', 'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Statistics',
  'Environmental Science', 'Psychology', 'Sociology', 'Political Science',
  'International Relations', 'Law', 'Education', 'English Literature', 'History', 'Philosophy',
  'Communication Studies', 'Journalism', 'Media Studies', 'Graphic Design', 'Fine Arts',
  'Agriculture', 'Architecture', 'Tourism Management', 'Hotel Management', 'Urban Planning'
];

// AI Model Configuration
const AI_CONFIG = {
  EMBEDDING_MODEL: 'sentence-transformers/all-MiniLM-L6-v2',
  CACHE_KEY: 'scholarship_embeddings',
  API_DELAY_MS: 100,
  DEFAULT_LIMIT: 10
};

// Scoring Weights for Match Algorithm
const MATCH_WEIGHTS = {
  STUDENT_TYPE: 20,
  FIELD_MATCH: 40,
  GPA_REQUIREMENT: 20,
  REQUIRED_SUBJECTS: 20
};

// Match Score Thresholds
const MATCH_THRESHOLDS = {
  EXCEPTIONAL: 85,
  STRONG: 70,
  GOOD: 55,
  POTENTIAL: 0
};

export {
  SUBJECT_FIELD_MAPPING,
  GRADE_POINTS,
  SUBJECTS,
  UNIVERSITY_FIELDS,
  AI_CONFIG,
  MATCH_WEIGHTS,
  MATCH_THRESHOLDS
};

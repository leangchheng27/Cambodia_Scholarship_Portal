/**
 * Backend Configuration Constants
 * Contains mapping rules and constants for the recommendation engine
 */

// Subject to Field Mapping Rules
export const SUBJECT_FIELD_MAPPING = {
  // Science Student Mappings
  science: {
    'Math-Physics': ['Engineering', 'Architecture', 'Computer Science', 'Data Science', 'Aerospace Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
    'Math-Chemistry': ['Chemical Engineering', 'Pharmaceutical Sciences', 'Materials Science', 'Environmental Engineering'],
    'Biology-Chemistry': ['Medicine', 'Pharmacy', 'Biotechnology', 'Nursing', 'Veterinary Medicine', 'Biochemistry', 'Health Sciences'],
    'Biology-Physics': ['Biomedical Engineering', 'Medical Physics', 'Biophysics'],
    'Math-English': ['Computer Science', 'Information Technology', 'Business Analytics', 'Economics', 'International Business'],
    'Physics-Chemistry': ['Materials Engineering', 'Nanotechnology', 'Energy Engineering', 'Industrial Engineering'],
    'Math': ['Mathematics', 'Statistics', 'Actuarial Science', 'Finance', 'Economics'],
    'Biology': ['Biology', 'Environmental Science', 'Agriculture', 'Forestry', 'Marine Biology'],
    'Physics': ['Physics', 'Applied Physics', 'Electronics'],
    'Chemistry': ['Chemistry', 'Forensic Science', 'Food Science']
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
    'English': ['English Literature', 'Translation', 'TESOL', 'Linguistics', 'Media Studies'],
    'Math': ['Business', 'Accounting', 'Finance', 'Economics', 'Banking'],
    'History': ['History', 'Museum Studies', 'Heritage Conservation'],
    'Geography': ['Geography', 'Cartography', 'GIS Technology'],
    'Morality': ['Psychology', 'Sociology', 'Social Work', 'Public Administration']
  }
};

// Grade point conversion
export const GRADE_POINTS = {
  'A': 4.0,
  'B': 3.0,
  'C': 2.0,
  'D': 1.0,
  'E': 0.5,
  'F': 0.0
};

// Subject names for each student type
export const SUBJECTS = {
  science: ['Math', 'Biology', 'Khmer Literature', 'Physics', 'Chemistry', 'History', 'English'],
  society: ['Math', 'History', 'Khmer Literature', 'Geography', 'Morality', 'Earth Science', 'English']
};

// University Fields/Majors for college/university students
export const UNIVERSITY_FIELDS = [
  // Technology & Engineering
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
  'Industrial Engineering',
  
  // Business & Finance
  'Business Administration',
  'Management',
  'Finance',
  'Accounting',
  'Economics',
  'Banking',
  'Marketing',
  'International Business',
  'Entrepreneurship',
  'Human Resources',
  
  // Consulting & Strategy
  'Management Consulting',
  'Strategy',
  'Business Analytics',
  'Operations Management',
  
  // Health Sciences
  'Medicine',
  'Nursing',
  'Pharmacy',
  'Public Health',
  'Health Sciences',
  'Biotechnology',
  'Biomedical Engineering',
  
  // Natural Sciences
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'Statistics',
  'Environmental Science',
  
  // Social Sciences & Humanities
  'Psychology',
  'Sociology',
  'Political Science',
  'International Relations',
  'Law',
  'Education',
  'English Literature',
  'History',
  'Philosophy',
  
  // Arts & Media
  'Communication Studies',
  'Journalism',
  'Media Studies',
  'Graphic Design',
  'Fine Arts',
  
  // Other Fields
  'Agriculture',
  'Architecture',
  'Tourism Management',
  'Hotel Management',
  'Urban Planning'
];

// AI Model Configuration
export const AI_CONFIG = {
  EMBEDDING_MODEL: 'sentence-transformers/all-MiniLM-L6-v2',
  CACHE_KEY: 'scholarship_embeddings',
  API_DELAY_MS: 100, // Delay between API calls to respect rate limits
  DEFAULT_LIMIT: 10 // Default number of recommendations
};

// Scoring Weights for Match Algorithm
export const MATCH_WEIGHTS = {
  STUDENT_TYPE: 20,
  FIELD_MATCH: 40,
  GPA_REQUIREMENT: 20,
  REQUIRED_SUBJECTS: 20
};

// Match Score Thresholds
export const MATCH_THRESHOLDS = {
  EXCEPTIONAL: 85,
  STRONG: 70,
  GOOD: 55,
  POTENTIAL: 0
};

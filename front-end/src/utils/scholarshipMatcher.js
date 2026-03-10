/**
 * Scholarship Recommendation Engine - AI-Powered Matching System
 * 
 * This utility provides intelligent scholarship recommendations by:
 * - Analyzing student grades and subjects
 * - Mapping subjects to suitable fields of study
 * - Calculating match scores based on GPA, subjects, and eligibility
 * - Generating personalized recommendations with explanations
 * 
 * @module scholarshipMatcher
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

/**
 * Analyze student's strong subjects (grades A or B)
 */
export function analyzeStrongSubjects(grades) {
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
 */
export function calculateGPA(grades) {
  const gradeValues = Object.values(grades).map(grade => GRADE_POINTS[grade] || 0);
  if (gradeValues.length === 0) {
    return 0.0;
  }
  const sum = gradeValues.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / gradeValues.length).toFixed(2));
}

/**
 * Get recommended fields based on strong subject combinations
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
 * Calculate match score between user profile and scholarship
 * Returns a score from 0-100
 */
export function calculateMatchScore(userProfile, scholarship) {
  console.log(`\n=== calculateMatchScore for ${scholarship.title} ===`);
  console.log('userProfile:', userProfile);
  console.log('userProfile.grades:', userProfile?.grades);
  console.log('typeof grades:', typeof userProfile?.grades);
  console.log('grades keys:', userProfile?.grades ? Object.keys(userProfile.grades) : 'No grades');
  
  let score = 0;
  const maxScore = 100;
  
  // Validate grades exist
  if (!userProfile || !userProfile.grades || Object.keys(userProfile.grades).length === 0) {
    console.warn(`No valid grades found for ${scholarship.title}, returning default score 50`);
    return 50; // Default score if no grades
  }
  
  // Use academicType if studentType is not available (for backward compatibility)
  const studentType = userProfile.studentType || userProfile.academicType || 'highschool';
  console.log('studentType:', studentType);
  
  // 1. Check student type compatibility (20 points)
  if (scholarship.aiMetadata?.studentTypes) {
    if (scholarship.aiMetadata.studentTypes.includes(studentType) || 
        scholarship.aiMetadata.studentTypes.includes('both')) {
      score += 20;
      console.log('Student type match: +20 points');
    }
  } else {
    score += 10; // Partial credit if not specified
    console.log('No student type specified: +10 points');
  }
  
  // 2. Check field of study match (40 points)
  const recommendedFields = getRecommendedFields(studentType, userProfile.grades);
  console.log('recommendedFields:', recommendedFields);
  if (scholarship.aiMetadata?.fieldCategories) {
    const matchingFields = recommendedFields.filter(field => 
      scholarship.aiMetadata.fieldCategories.some(category => 
        category.toLowerCase().includes(field.toLowerCase()) || 
        field.toLowerCase().includes(category.toLowerCase())
      )
    );
    const fieldPoints = Math.min(40, matchingFields.length * 10);
    score += fieldPoints;
    console.log(`Field match (${matchingFields.length} fields): +${fieldPoints} points`);
  }
  
  // 3. Check GPA requirements (20 points)
  const gpa = parseFloat(calculateGPA(userProfile.grades));
  console.log('Calculated GPA:', gpa);
  if (!isNaN(gpa) && scholarship.aiMetadata?.minGPA) {
    if (gpa >= scholarship.aiMetadata.minGPA) {
      score += 20;
      console.log('GPA meets requirement: +20 points');
    } else if (gpa >= scholarship.aiMetadata.minGPA - 0.5) {
      score += 10; // Close to requirement
      console.log('GPA close to requirement: +10 points');
    }
  } else {
    score += 15; // Partial credit if not specified
    console.log('No GPA requirement or GPA is NaN: +15 points');
  }
  
  // 4. Check required subjects (20 points)
  if (scholarship.aiMetadata?.requiredSubjects) {
    const userStrongSubjects = analyzeStrongSubjects(userProfile.grades);
    console.log('userStrongSubjects:', userStrongSubjects);
    const matchingSubjects = scholarship.aiMetadata.requiredSubjects.filter(subject =>
      userStrongSubjects.includes(subject)
    );
    const subjectMatchRatio = matchingSubjects.length / scholarship.aiMetadata.requiredSubjects.length;
    const subjectPoints = Math.round(20 * subjectMatchRatio);
    score += subjectPoints;
    console.log(`Subject match (${matchingSubjects.length}/${scholarship.aiMetadata.requiredSubjects.length}): +${subjectPoints} points`);
  } else {
    score += 10; // Partial credit if not specified
    console.log('No required subjects: +10 points');
  }
  
  const finalScore = Math.min(maxScore, Math.round(score));
  console.log(`Final score for ${scholarship.title}: ${finalScore}`);
  const result = isNaN(finalScore) ? 50 : finalScore; // Ensure we never return NaN
  console.log(`Returning: ${result} (isNaN check: ${isNaN(finalScore)})`);
  return result;
}

/**
 * Get scholarship recommendations for a user
 * Returns scholarships sorted by match score
 */
export function getScholarshipRecommendations(userProfile, scholarships, limit = 10) {
  console.log('getScholarshipRecommendations - userProfile:', userProfile);
  console.log('getScholarshipRecommendations - scholarships count:', scholarships.length);
  
  // Check if scholarships have category tags
  const withCategory = scholarships.filter(s => s.category);
  console.log(`Scholarships with category: ${withCategory.length}`);
  if (withCategory.length > 0) {
    console.log('Sample scholarship:', withCategory[0].title, 'Category:', withCategory[0].category);
  }
  
  // Calculate match score for each scholarship
  const scoredScholarships = scholarships.map(scholarship => {
    const matchScore = calculateMatchScore(userProfile, scholarship);
    console.log(`Calculated match score for ${scholarship.title}: ${matchScore}% (Category: ${scholarship.category || 'MISSING'})`);
    return {
      ...scholarship,
      matchScore,
      matchReasons: generateMatchReasons(userProfile, scholarship)
    };
  });
  
  // Sort by match score (highest first)
  scoredScholarships.sort((a, b) => {
    const diff = b.matchScore - a.matchScore;
    return diff;
  });
  
  console.log('Sorted scholarships (top 5):');
  scoredScholarships.slice(0, 5).forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.title} - ${s.matchScore}% - Category: ${s.category || 'MISSING'}`);
  });
  
  // Return top matches
  return scoredScholarships.slice(0, limit);
}

/**
 * Generate human-readable reasons for the match
 */
function generateMatchReasons(userProfile, scholarship) {
  const reasons = [];
  const recommendedFields = getRecommendedFields(userProfile.studentType, userProfile.grades);
  const strongSubjects = analyzeStrongSubjects(userProfile.grades);
  const gpa = calculateGPA(userProfile.grades);
  
  // Field match reason
  if (scholarship.aiMetadata?.fieldCategories) {
    const matchingFields = recommendedFields.filter(field => 
      scholarship.aiMetadata.fieldCategories.some(category => 
        category.toLowerCase().includes(field.toLowerCase())
      )
    );
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
 * Get text description for AI embedding
 * Combines all relevant scholarship information into a single string
 */
export function getScholarshipEmbeddingText(scholarship) {
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
 * Get text description for user profile embedding
 */
export function getUserProfileEmbeddingText(userProfile) {
  const strongSubjects = analyzeStrongSubjects(userProfile.grades);
  const recommendedFields = getRecommendedFields(userProfile.studentType, userProfile.grades);
  const gpa = calculateGPA(userProfile.grades);
  
  return `${userProfile.studentType} student with GPA ${gpa}. Strong in ${strongSubjects.join(', ')}. Interested in ${recommendedFields.slice(0, 5).join(', ')}.`;
}

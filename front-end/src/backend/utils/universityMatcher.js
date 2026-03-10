/**
 * University Student Matcher
 * Matches university students with internships and scholarships based on their field of study
 */

/**
 * Check if a scholarship/internship matches a university student's field
 * @param {object} scholarship - Scholarship/internship with aiMetadata
 * @param {string} userField - Student's field of study
 * @returns {boolean} - True if field matches
 */
export function matchesUniversityField(scholarship, userField) {
  if (!scholarship.aiMetadata || !scholarship.aiMetadata.fieldCategories) {
    return false;
  }

  const { fieldCategories } = scholarship.aiMetadata;
  
  // Direct match
  if (fieldCategories.includes(userField)) {
    return true;
  }

  // Check for related fields (case-insensitive partial match)
  const userFieldLower = userField.toLowerCase();
  return fieldCategories.some(category => 
    category.toLowerCase().includes(userFieldLower) || 
    userFieldLower.includes(category.toLowerCase())
  );
}

/**
 * Calculate match score for university student
 * @param {object} scholarship - Scholarship/internship with aiMetadata
 * @param {string} userField - Student's field of study
 * @param {number} userGPA - Optional: Student's GPA (if provided)
 * @returns {number} - Match score (0-100)
 */
export function calculateUniversityMatchScore(scholarship, userField, userGPA = null) {
  if (!scholarship.aiMetadata) {
    return 0;
  }

  let score = 0;
  const { fieldCategories, minGPA, difficultyLevel } = scholarship.aiMetadata;

  // Field Match (70 points maximum)
  if (matchesUniversityField(scholarship, userField)) {
    const userFieldLower = userField.toLowerCase();
    const exactMatch = fieldCategories.some(cat => cat.toLowerCase() === userFieldLower);
    
    if (exactMatch) {
      score += 70; // Exact field match
    } else {
      score += 50; // Related field match
    }
  }

  // GPA Requirement (20 points maximum) - if GPA provided
  if (userGPA !== null && minGPA) {
    const gpaGap = userGPA - minGPA;
    if (gpaGap >= 0.5) {
      score += 20; // Well above minimum
    } else if (gpaGap >= 0) {
      score += 15; // Meets minimum
    } else if (gpaGap >= -0.3) {
      score += 5; // Close to minimum
    }
    // Below minimum: 0 points
  } else if (userGPA !== null) {
    score += 10; // No GPA requirement, give some points
  }

  // Difficulty adjustment (10 points maximum)
  if (difficultyLevel) {
    switch (difficultyLevel) {
      case 'moderate':
        score += 10;
        break;
      case 'competitive':
        score += 7;
        break;
      case 'very-competitive':
        score += 5;
        break;
      default:
        score += 10;
    }
  }

  return Math.min(score, 100);
}

/**
 * Get internship recommendations for university students
 * @param {array} internships - Array of internship opportunities
 * @param {string} userField - Student's field of study
 * @param {number} userGPA - Optional: Student's GPA
 * @param {number} limit - Maximum recommendations to return
 * @returns {array} - Sorted array of recommendations with match scores
 */
export function getUniversityInternshipRecommendations(internships, userField, userGPA = null, limit = 10) {
  if (!userField || !internships || internships.length === 0) {
    return [];
  }

  // Calculate match scores
  const recommendations = internships.map(internship => {
    const matchScore = calculateUniversityMatchScore(internship, userField, userGPA);
    
    const reasons = [];
    if (matchesUniversityField(internship, userField)) {
      reasons.push(`Perfect match for ${userField} field`);
    }
    
    if (userGPA && internship.aiMetadata?.minGPA) {
      if (userGPA >= internship.aiMetadata.minGPA) {
        reasons.push(`Your GPA (${userGPA.toFixed(1)}) meets requirements`);
      }
    }

    return {
      ...internship,
      matchScore,
      matchReasons: reasons
    };
  });

  // Filter out low matches (< 30) and sort by score
  return recommendations
    .filter(rec => rec.matchScore >= 30)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

/**
 * Generate match reasons for university student
 * @param {object} scholarship - Scholarship/internship
 * @param {string} userField - Student's field of study
 * @param {number} matchScore - Calculated match score
 * @returns {array} - Array of match reason strings
 */
export function generateUniversityMatchReasons(scholarship, userField, matchScore) {
  const reasons = [];

  if (!scholarship.aiMetadata) {
    return ['No match data available'];
  }

  // Field match reason
  if (matchesUniversityField(scholarship, userField)) {
    const exactMatch = scholarship.aiMetadata.fieldCategories.some(
      cat => cat.toLowerCase() === userField.toLowerCase()
    );
    
    if (exactMatch) {
      reasons.push(`🎯 Perfect match for your ${userField} major`);
    } else {
      reasons.push(`✅ Related to your ${userField} field`);
    }
  }

  // Match quality
  if (matchScore >= 85) {
    reasons.push('⭐ Exceptional match for your profile');
  } else if (matchScore >= 70) {
    reasons.push('💪 Strong match for your background');
  } else if (matchScore >= 50) {
    reasons.push('👍 Good opportunity to explore');
  }

  // Difficulty level
  if (scholarship.aiMetadata.difficultyLevel === 'moderate') {
    reasons.push('📊 Moderate competition level');
  } else if (scholarship.aiMetadata.difficultyLevel === 'competitive') {
    reasons.push('🎓 Competitive opportunity');
  } else if (scholarship.aiMetadata.difficultyLevel === 'very-competitive') {
    reasons.push('🏆 Highly competitive program');
  }

  return reasons.length > 0 ? reasons : ['Consider this opportunity'];
}

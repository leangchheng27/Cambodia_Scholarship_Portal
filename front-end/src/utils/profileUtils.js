/**
 * Frontend utility functions for profile calculations
 */

/**
 * List of subjects available in the system
 */
export const SUBJECTS = {
  science: [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Khmer',
    'English',
    'Physical Education',
    'History',
    'Geography',
    'Moral-Civics Education',
    'Earth & Environmental Science',
  ],
  social: [
    'Mathematics',
    'Accounting',
    'Economy',
    'Management',
    'Khmer',
    'English',
    'Physical Education',
    'History',
    'Geography',
    'Moral-Civics Education',
  ],
};

/**
 * Calculate GPA from grades object
 * @param {Object} grades - Object with subject names as keys and grades as values
 * @returns {number} - Calculated GPA (0-4 scale)
 */
export function calculateGPA(grades) {
  if (!grades || Object.keys(grades).length === 0) {
    return 0;
  }

  // Map letter grades to GPA points
  const gradePoints = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'E': 0.5,
    'F': 0.0,
  };

  const values = Object.values(grades);
  const total = values.reduce((sum, grade) => {
    // Handle both letter grades and numeric inputs
    const point = typeof grade === 'string' ? (gradePoints[grade.toUpperCase()] || 0) : parseFloat(grade) || 0;
    return sum + point;
  }, 0);

  return (total / values.length).toFixed(2);
}

/**
 * Analyze which subjects a student is strong in
 * @param {Object} grades - Object with subject names as keys and grades as values
 * @returns {Array<string>} - Array of subject names where student excels
 */
export function analyzeStrongSubjects(grades) {
  if (!grades || Object.keys(grades).length === 0) {
    return [];
  }

  const gradeValues = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'E': 0.5,
    'F': 0.0,
  };

  const strongSubjects = [];
  
  for (const [subject, grade] of Object.entries(grades)) {
    const numericGrade = typeof grade === 'string' ? (gradeValues[grade.toUpperCase()] || 0) : parseFloat(grade) || 0;
    // Consider B grade (3.0) and above as strong
    if (numericGrade >= 3.0) {
      strongSubjects.push(subject);
    }
  }

  return strongSubjects;
}

/**
 * Get AI-powered scholarship recommendations
 * This is a placeholder that calls the backend API
 * @param {Object} profile - User profile data
 * @returns {Promise<Array>} - Array of recommended scholarships
 */
export async function getAIRecommendations(profile) {
  try {
    const response = await fetch('http://localhost:3000/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ profile })
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const data = await response.json();
    return data.recommendations || [];
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return [];
  }
}

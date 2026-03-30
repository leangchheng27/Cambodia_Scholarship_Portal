/**
 * Helper functions for profile management
 */

/**
 * Check if user profile is completed
 * A profile is considered completed if it has the essential fields filled
 * @param {Object} profile - User profile object
 * @returns {boolean} - True if profile is completed
 */
export function isProfileCompleted(profile) {
  if (!profile) {
    return false;
  }

  // Backward compatibility: Existing users may not have profileType set
  // If they have educationLevel, studentType, academicType, or universityField, consider profile as completed
  if (!profile.profileType) {
    // Check if user has any legacy profile data (existing users from before new fields)
    const hasLegacyProfileData = profile.educationLevel || profile.studentType || profile.academicType || profile.universityField;
    if (hasLegacyProfileData) {
      return true; // Existing users with any profile data are considered complete
    }
    return false; // New users must set profileType
  }

  // For student profiles
  if (profile.profileType === 'student') {
    // Must have studentType
    if (!profile.studentType) {
      return false;
    }

    // University students need universityField
    if ((profile.studentType === 'college' || profile.studentType === 'graduate')) {
      return !!profile.universityField;
    }

    // High school students need academicType and grades
    if (profile.studentType === 'highschool') {
      return !!profile.academicType && !!profile.grades && Object.keys(profile.grades).length > 0;
    }
  }

  // For parent profiles
  if (profile.profileType === 'parent') {
    // Must have parentType
    if (!profile.parentType) {
      return false;
    }

    // University parent needs universityField
    if ((profile.parentType === 'college' || profile.parentType === 'graduate')) {
      return !!profile.universityField;
    }

    // High school parent needs grades
    if (profile.parentType === 'highschool') {
      return !!profile.grades && Object.keys(profile.grades).length > 0;
    }
  }

  return true;
}

/**
 * Get profile completion status with reason
 * @param {Object} profile - User profile object
 * @returns {Object} - { completed: boolean, reason: string }
 */
export function getProfileStatus(profile) {
  if (!profile) {
    return { completed: false, reason: 'No profile data found' };
  }

  if (!profile.profileType) {
    return { completed: false, reason: 'Profile type not set' };
  }

  if (profile.profileType === 'student') {
    if (!profile.studentType) {
      return { completed: false, reason: 'Student type not set' };
    }

    if ((profile.studentType === 'college' || profile.studentType === 'graduate')) {
      if (!profile.universityField) {
        return { completed: false, reason: 'University field not set' };
      }
    }

    if (profile.studentType === 'highschool') {
      if (!profile.academicType) {
        return { completed: false, reason: 'Academic type not set' };
      }
      if (!profile.grades || Object.keys(profile.grades).length === 0) {
        return { completed: false, reason: 'Grades not entered' };
      }
    }
  }

  if (profile.profileType === 'parent') {
    if (!profile.parentType) {
      return { completed: false, reason: 'Parent type not set' };
    }

    if ((profile.parentType === 'college' || profile.parentType === 'graduate')) {
      if (!profile.universityField) {
        return { completed: false, reason: 'University field not set' };
      }
    }

    if (profile.parentType === 'highschool') {
      if (!profile.grades || Object.keys(profile.grades).length === 0) {
        return { completed: false, reason: 'Grades not entered' };
      }
    }
  }

  return { completed: true, reason: 'Profile completed' };
}

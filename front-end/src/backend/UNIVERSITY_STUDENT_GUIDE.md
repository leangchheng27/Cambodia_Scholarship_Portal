# University Student Profile System

## Overview
The profile system now supports **both high school and university students**, enabling field-based internship recommendations for university students.

## Profile Types

### 1. High School Students (Science/Society)
- **Step 1**: Select "Current Student" → "High School Student"
- **Step 2**: Choose stream (Science/Society) → Enter subject grades
- **Matching**: AI matches based on subjects, grades, and recommended fields
- **Use Case**: Scholarship recommendations for undergraduate programs

### 2. University Students (Field-Based)
- **Step 1**: Select "Current Student" → "College/University Student" or "Graduate Student"
- **Step 2**: Select field of study from 60+ available majors
- **Matching**: Direct field matching for internships and opportunities
- **Use Case**: Internship and career opportunity recommendations

## Available University Fields

The system includes **70+ fields** across categories:

### Technology & Engineering
- Computer Science, Software Engineering, IT, Data Science
- AI, Cybersecurity, Web Development
- Civil, Mechanical, Electrical, Chemical Engineering

### Business & Finance
- Business Administration, Management, Finance, Accounting
- Economics, Banking, Marketing, HR, Entrepreneurship

### Consulting & Strategy
- Management Consulting, Strategy, Business Analytics
- Operations Management, Digital Transformation

### Health Sciences
- Medicine, Nursing, Pharmacy, Public Health
- Biotechnology, Biomedical Engineering

### Natural Sciences
- Biology, Chemistry, Physics, Mathematics
- Statistics, Environmental Science

### Social Sciences & Humanities
- Psychology, Sociology, Political Science
- International Relations, Law, Education, History

### Arts & Media
- Communication Studies, Journalism, Media Studies
- Graphic Design, Fine Arts

### Other Specialized Fields
- Agriculture, Architecture, Tourism, Hotel Management, Urban Planning

## How Matching Works

### High School Students
```javascript
// calculateMatchScore() from recommendationEngine.js
// 100-point system:
// - Student Type Match: 20 points
// - Field Categories Match: 40 points
// - GPA Requirements: 20 points
// - Required Subjects: 20 points
```

### University Students
```javascript
// calculateUniversityMatchScore() from universityMatcher.js
// 100-point system:
// - Field Match: 70 points (exact) or 50 points (related)
// - GPA Requirements: 20 points
// - Difficulty Adjustment: 10 points
```

## Backend Functions

### For University Students
Located in `/src/backend/utils/universityMatcher.js`:

- **matchesUniversityField(scholarship, userField)**: Check if field matches
- **calculateUniversityMatchScore(scholarship, userField, userGPA)**: Calculate match score
- **getUniversityInternshipRecommendations(internships, userField, userGPA, limit)**: Get top recommendations
- **generateUniversityMatchReasons(scholarship, userField, matchScore)**: Generate match explanations

### Usage Example
```javascript
import { 
  getUniversityInternshipRecommendations,
  generateUniversityMatchReasons 
} from '../backend';
import { internshipScholarships } from '../data/internshipScholarships';

// Get recommendations for CS student
const recommendations = getUniversityInternshipRecommendations(
  internshipScholarships,
  'Computer Science',
  3.5,  // GPA (optional)
  10    // Limit
);

// Each recommendation includes:
// - ...internship data
// - matchScore: 0-100
// - matchReasons: ['Perfect match for Computer Science field', ...]
```

## Internship Data Structure

All internships now have `aiMetadata` for matching:

```javascript
{
  id: 1,
  title: 'Google Summer of Code',
  description: 'Paid internship program',
  deadline: 'March 15, 2025',
  aiMetadata: {
    studentTypes: ['science'],
    fieldCategories: [
      'Computer Science',
      'Software Engineering',
      'Information Technology'
    ],
    requiredSubjects: ['Math', 'English'],
    minGPA: 2.8,
    difficultyLevel: 'competitive',
    keywords: ['google', 'coding', 'programming', 'software']
  },
  details: { ... }
}
```

## Profile Storage

### High School Profile
```javascript
{
  profileType: "student",
  academicType: "science",  // or "society"
  grades: {
    Math: "A",
    Physics: "B",
    Chemistry: "A",
    Biology: "B",
    English: "A"
  }
}
```

### University Profile
```javascript
{
  profileType: "student",
  studentType: "college",  // or "graduate"
  universityField: "Computer Science"
}
```

## Integration Points

### 1. Profile Setup Page
- Detects student type (high school vs university)
- Shows appropriate interface (grades vs field selection)
- Saves profile to AuthContext

### 2. AI Recommendations Component
Should detect profile type and use appropriate matching:

```javascript
// In AIRecommendations.jsx or ProfilePage.jsx
const { userProfile } = useAuth();

if (userProfile.universityField) {
  // University student - use field-based matching
  const recommendations = getUniversityInternshipRecommendations(
    internshipScholarships,
    userProfile.universityField,
    userProfile.gpa
  );
} else if (userProfile.grades) {
  // High school student - use grade-based matching
  const recommendations = getScholarshipRecommendations(
    scholarships,
    userProfile
  );
}
```

## Next Steps

1. **Update AI Recommendations Component**: Detect university students and use `getUniversityInternshipRecommendations()`
2. **Update Profile Display**: Show field instead of grades for university students
3. **Add GPA Input**: Optional GPA field for university students to improve matching
4. **Internship Page**: Create dedicated internship page using university matching
5. **Filter Options**: Add field-based filters on internship listings

## Benefits

✅ **Personalized internship recommendations** based on exact field of study  
✅ **70+ supported fields** covering all major university programs  
✅ **Consistent matching logic** with scholarship recommendations  
✅ **Extensible system** - easy to add more fields or internships  
✅ **Type-safe profiles** - different data structures for different student types

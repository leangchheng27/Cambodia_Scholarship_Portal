import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyzeProfile } from '../api/recommendationApi';

export const useProfileSetup = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState("");
  const [studentType, setStudentType] = useState("");
  const [parentType, setParentType] = useState("");
  const [academicType, setAcademicType] = useState("science");
  const [universityField, setUniversityField] = useState("");
  const [grades, setGrades] = useState({});
  
  // Profile analysis data from backend
  const [profileData, setProfileData] = useState({
    gpa: 0,
    strongSubjects: [],
    recommendedFields: []
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  // Check if user is at university level
  const isUniversityLevel = (studentType === 'college' || studentType === 'graduate') || 
                           (parentType === 'college' || parentType === 'graduate');

  // Analyze profile when reaching step 3
  useEffect(() => {
    const fetchProfileAnalysis = async () => {
      if (currentStep === 3 && !isUniversityLevel && Object.keys(grades).length > 0) {
        console.log('Step 3: Fetching profile analysis...');
        setIsAnalyzing(true);
        setAnalysisError(null);
        try {
          // pass a studentType (falls back to profileType or academicType) so backend validation succeeds
          const response = await analyzeProfile(studentType || profileType || academicType, grades);
          console.log('API Response:', response);
          if (response.success) {
            setProfileData({
              gpa: response.data.gpa,
              strongSubjects: response.data.strongSubjects,
              recommendedFields: response.data.recommendedFields
            });
            console.log('Profile data updated successfully');
          } else {
            setAnalysisError('Failed to analyze profile');
          }
        } catch (error) {
          console.error('Error analyzing profile:', error);
          // Silently fail - profile will show without AI recommendations
          // No need to display error since profile still works with entered grades
          setProfileData({
            gpa: 0,
            strongSubjects: [],
            recommendedFields: []
          });
        } finally {
          setIsAnalyzing(false);
        }
      }
    };

    fetchProfileAnalysis();
  }, [currentStep, academicType, grades, isUniversityLevel, studentType, profileType]);

  const handleNext = () => {
    console.log(`handleNext called - Current step: ${currentStep}`);
    
    if (currentStep === 1 && !profileType) {
      alert("Please select an option");
      return;
    }
    if (profileType === "student" && !studentType) {
      alert("Please select student type");
      return;
    }
    if (profileType === "parent" && !parentType) {
      alert("Please select parent type");
      return;
    }
    
    // Validate before moving from step 2 to step 3
    if (currentStep === 2) {
      console.log('Step 2 validation - About to move to step 3');
      const isUniversityStudent = studentType === 'college' || studentType === 'graduate';
      const isUniversityParent = parentType === 'college' || parentType === 'graduate';
      
      if (profileType === "student" && isUniversityStudent) {
        if (!universityField) {
          alert("Please select your field of study");
          return;
        }
        updateProfile({
          profileType,
          studentType,
          universityField,
        });
      } else if (profileType === "parent" && isUniversityParent) {
        if (!universityField) {
          alert("Please select your child's field of study");
          return;
        }
        updateProfile({
          profileType,
          parentType,
          universityField,
        });
      } else {
        const enteredGrades = Object.keys(grades).filter(key => grades[key]);
        if (enteredGrades.length === 0) {
          alert("Please enter at least one subject grade before proceeding");
          return;
        }
        
        updateProfile({
          profileType,
          studentType,
          parentType,
          academicType,
          grades,
        });
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    const isUniversityStudent = studentType === 'college' || studentType === 'graduate';
    const isUniversityParent = parentType === 'college' || parentType === 'graduate';
    
    if ((profileType === "student" && isUniversityStudent) || (profileType === "parent" && isUniversityParent)) {
      const profileData = {
        profileType,
        studentType,
        parentType,
        universityField,
      };
      console.log('ProfileSetupPage - Saving university profile:', profileData);
      updateProfile(profileData);
    } else {
      const profileData = {
        profileType,
        studentType,
        academicType,
        parentType,
        grades,
      };
      console.log('ProfileSetupPage - Saving high school profile with grades:', profileData);
      console.log('ProfileSetupPage - Grades object:', grades);
      updateProfile(profileData);
    }
    navigate('/home');
  };

  const handleSkip = () => {
    console.log('Skipping profile details - saving minimal profile');
    const profileData = {
      profileType,
      studentType,
      parentType,
      skipped: true,
      hasRecommendations: false,
    };
    console.log('ProfileSetupPage - Saving skipped profile:', profileData);
    updateProfile(profileData);
    navigate('/home');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGradeChange = (subject, grade) => {
    setGrades(prev => ({
      ...prev,
      [subject]: grade
    }));
  };

  const handleAcademicTypeChange = (type) => {
    setAcademicType(type);
    setGrades({});
  };

  const handleProfileTypeSelect = (type) => {
    setProfileType(type);
    if (type !== "student") {
      setStudentType("");
    }
    if (type !== "parent") {
      setParentType("");
    }
  };

  const handleStudentTypeSelect = (type) => {
    setStudentType(type);
  };

  const handleParentTypeSelect = (type) => {
    setParentType(type);
  };

  const handleUniversityFieldChange = (field) => {
    setUniversityField(field);
  };

  return {
    // State
    currentStep,
    profileType,
    studentType,
    parentType,
    academicType,
    universityField,
    grades,
    profileData,
    isAnalyzing,
    analysisError,
    isUniversityLevel,
    
    // Handlers
    handleNext,
    handleComplete,
    handleSkip,
    handleBack,
    handleGradeChange,
    handleAcademicTypeChange,
    handleProfileTypeSelect,
    handleStudentTypeSelect,
    handleParentTypeSelect,
    handleUniversityFieldChange,
  };
};

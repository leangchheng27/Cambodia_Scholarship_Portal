import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ProfileSetupLayout from '../Layout/ProfileSetupLayout';
import ProfileProgressIndicator from '../components/ProfileProgressIndicator/ProfileProgressIndicator';
import ProfileTypeSelector from '../components/ProfileTypeSelector/ProfileTypeSelector';
import AcademicTypeSelector from '../components/AcademicTypeSelector/AcademicTypeSelector';
import GradeEntryForm from '../components/GradeEntryForm/GradeEntryForm';
import FieldSelector from '../components/FieldSelector/FieldSelector';
import ProfileSummary from '../components/ProfileSummary/ProfileSummary';
import { analyzeProfile } from '../../../api/recommendationApi';
import './ProfileSetupPage.css';

const ProfileSetupPage = () => {
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
  }, [currentStep, academicType, grades, isUniversityLevel]);

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

  return (
    <ProfileSetupLayout>
      <h1 className="profile-title">Create Your Profile</h1>
      
      <ProfileProgressIndicator currentStep={currentStep} />

      {/* Step 1: Profile Type Selection */}
      {currentStep === 1 && (
        <div className="step-content">
          <ProfileTypeSelector
            profileType={profileType}
            studentType={studentType}
            parentType={parentType}
            onProfileTypeSelect={handleProfileTypeSelect}
            onStudentTypeSelect={handleStudentTypeSelect}
            onParentTypeSelect={handleParentTypeSelect}
          />
          <div className="button-group">
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {/* Step 2: Academic Profile & Grades */}
      {currentStep === 2 && (
        <div className="step-content step-2-content">
          {isUniversityLevel ? (
            <>
              <h2 className="profile-section-title white-title">Your Field of Study</h2>
              <FieldSelector
                profileType={profileType}
                universityField={universityField}
                onFieldChange={setUniversityField}
              />
            </>
          ) : (
            <>
              <h2 className="profile-section-title white-title">Your Academic Profile</h2>
              <AcademicTypeSelector
                academicType={academicType}
                onAcademicTypeChange={handleAcademicTypeChange}
              />
              <GradeEntryForm
                academicType={academicType}
                grades={grades}
                onGradeChange={handleGradeChange}
              />
            </>
          )}

          <div className="button-group">
            <button className="back-btn" onClick={handleBack}>Back</button>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {/* Step 3: Final Step */}
      {currentStep === 3 && (
        <div className="step-content success-step">
          <h2 className="success-title">Your Profile Created Successfully!</h2>
          
          {isAnalyzing && (
            <div className="loading-message">Analyzing your profile...</div>
          )}
          
          {!isAnalyzing && (
            <ProfileSummary
              profileType={profileType}
              studentType={studentType}
              parentType={parentType}
              academicType={academicType}
              universityField={universityField}
              grades={grades}
              gpa={profileData.gpa}
              strongSubjects={profileData.strongSubjects}
              recommendedFields={profileData.recommendedFields}
            />
          )}
          
          <button className="explore-btn" onClick={handleComplete} disabled={isAnalyzing}>
            Start Exploring Scholarships
          </button>
        </div>
      )}
    </ProfileSetupLayout>
  );
};

export default ProfileSetupPage;

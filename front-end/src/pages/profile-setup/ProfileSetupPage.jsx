import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSetupLayout from '../../features/profile-setup/Layout/ProfileSetupLayout';
import ProfileProgressIndicator from '../../features/profile-setup/components/ProfileProgressIndicator/ProfileProgressIndicator';
import ProfileTypeSelector from '../../features/profile-setup/components/ProfileTypeSelector/ProfileTypeSelector';
import AcademicTypeSelector from '../../features/profile-setup/components/AcademicTypeSelector/AcademicTypeSelector';
import GradeEntryForm from '../../features/profile-setup/components/GradeEntryForm/GradeEntryForm';
import FieldSelector from '../../features/profile-setup/components/FieldSelector/FieldSelector';
import ProfileSummary from '../../features/profile-setup/components/ProfileSummary/ProfileSummary';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import './ProfileSetupPage.css';

const ProfileSetupPage = () => {
  const { user } = useAuth();
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState('');
  const [studentType, setStudentType] = useState('');
  const [parentType, setParentType] = useState('');
  const [academicType, setAcademicType] = useState('');
  const [universityField, setUniversityField] = useState('');
  const [grades, setGrades] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isUniversityLevel = studentType === 'college' || studentType === 'graduate' || parentType === 'college' || parentType === 'graduate';
  
  const handleProfileTypeSelect = (type) => setProfileType(type);
  const handleStudentTypeSelect = (type) => setStudentType(type);
  const handleParentTypeSelect = (type) => setParentType(type);
  const handleAcademicTypeChange = (type) => setAcademicType(type);
  const handleUniversityFieldChange = (field) => setUniversityField(field);
  const handleGradeChange = (subject, grade) => {
    setGrades(prev => ({
      ...prev,
      [subject]: grade
    }));
  };
  
  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);
  const handleSkip = () => setCurrentStep(prev => prev + 1);
  const handleComplete = async () => {
    setIsAnalyzing(true);
    
    try {
      // Map studentType/parentType to educationLevel
      let educationLevel = null;
      if (profileType === 'student') {
        if (studentType === 'highschool') educationLevel = 'High School Student';
        else if (studentType === 'college') educationLevel = 'College/University Student';
        else if (studentType === 'graduate') educationLevel = 'Graduate Student';
        else if (studentType === 'other') educationLevel = 'Other';
      } else if (profileType === 'parent') {
        if (parentType === 'highschool') educationLevel = 'High School Student';
        else if (parentType === 'college') educationLevel = 'College/University Student';
        else if (parentType === 'graduate') educationLevel = 'Graduate Student';
        else if (parentType === 'other') educationLevel = 'Other';
      }

      // Prepare data for backend
      const profileData = {
        profileType,
        studentType: profileType === 'student' ? studentType : null,
        parentType: profileType === 'parent' ? parentType : null,
        educationLevel,
        academicType: educationLevel === 'High School Student' ? academicType : null,
        universityField: educationLevel !== 'High School Student' ? universityField : null,
        grades: educationLevel === 'High School Student' ? grades : null,
      };

      // Update profile via AuthContext (handles both API call and state update)
      await updateProfile(profileData);
      
      console.log('✅ Profile setup complete:', profileData);
      navigate('/home');
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      setIsAnalyzing(false);
    }
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
                onFieldChange={handleUniversityFieldChange}
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
            <button className="skip-btn" onClick={handleSkip}>Skip</button>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {/* Step 3: Final Step */}
      {currentStep === 3 && (
        <div className="step-content success-step">
          <h2 className="success-title">Your Profile Created Successfully!</h2>
          
          <button className="explore-btn" onClick={handleComplete} disabled={isAnalyzing}>
            Start Exploring Scholarships
          </button>
        </div>
      )}
    </ProfileSetupLayout>
  );
};

export default ProfileSetupPage;

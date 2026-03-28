import React from 'react';
import ProfileSetupLayout from '../../features/profile-setup/Layout/ProfileSetupLayout';
import ProfileProgressIndicator from '../../features/profile-setup/components/ProfileProgressIndicator/ProfileProgressIndicator';
import ProfileTypeSelector from '../../features/profile-setup/components/ProfileTypeSelector/ProfileTypeSelector';
import AcademicTypeSelector from '../../features/profile-setup/components/AcademicTypeSelector/AcademicTypeSelector';
import GradeEntryForm from '../../features/profile-setup/components/GradeEntryForm/GradeEntryForm';
import FieldSelector from '../../features/profile-setup/components/FieldSelector/FieldSelector';
import ProfileSummary from '../../features/profile-setup/components/ProfileSummary/ProfileSummary';
import { useProfileSetup } from '../../hooks/useProfileSetup';
import './ProfileSetupPage.css';

const ProfileSetupPage = () => {
  const {
    currentStep,
    profileType,
    studentType,
    parentType,
    academicType,
    universityField,
    grades,
    profileData,
    isAnalyzing,
    isUniversityLevel,
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
  } = useProfileSetup();

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

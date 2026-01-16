import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profileSetup.css';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState("");
  const [studentType, setStudentType] = useState("");
  const [interests, setInterests] = useState([]);

  const handleNext = () => {
    if (currentStep === 1 && !profileType) {
      alert("Please select an option");
      return;
    }
    if (profileType === "student" && !studentType) {
      alert("Please select student type");
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 3 complete - navigate to home
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleProfileTypeSelect = (type) => {
    setProfileType(type);
    if (type !== "student") {
      setStudentType(""); // Reset student type if not a student
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-card">
        <h1 className="profile-title">Create Your Profile</h1>
        
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>1</div>
          <div className="progress-dot"></div>
          <div className="progress-dot"></div>
          <div className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>2</div>
          <div className="progress-dot"></div>
          <div className="progress-dot"></div>
          <div className="progress-dot"></div>
          <div className="progress-dot"></div>
          <div className="progress-dot"></div>
          <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* Step 1: Profile Type Selection */}
        {currentStep === 1 && (
          <div className="step-content">
            <h2 className="section-title">Which Best Describe About You</h2>
            
            <div className="profile-options">
              <div 
                className={`profile-option ${profileType === 'student' ? 'selected' : ''}`}
                onClick={() => handleProfileTypeSelect('student')}
              >
                <div className="option-icon">🎓</div>
                <div className="option-label">Current Student</div>
              </div>
              
              <div 
                className={`profile-option ${profileType === 'parent' ? 'selected' : ''}`}
                onClick={() => handleProfileTypeSelect('parent')}
              >
                <div className="option-icon">👨‍👩‍👧</div>
                <div className="option-label">Parent or Guardian of Student</div>
              </div>
              
              <div 
                className={`profile-option ${profileType === 'staff' ? 'selected' : ''}`}
                onClick={() => handleProfileTypeSelect('staff')}
              >
                <div className="option-icon">🏫</div>
                <div className="option-label">Institute Staff</div>
              </div>
            </div>

            {/* Student Type - Only show if Current Student is selected */}
            {profileType === 'student' && (
              <div className="student-type-section">
                <h3 className="student-type-title">What Kind of Student You Are?</h3>
                
                <div className="student-type-options">
                  <button 
                    className={`student-type-btn ${studentType === 'highschool' ? 'selected' : ''}`}
                    onClick={() => setStudentType('highschool')}
                  >
                    High School Student
                  </button>
                  
                  <button 
                    className={`student-type-btn ${studentType === 'college' ? 'selected' : ''}`}
                    onClick={() => setStudentType('college')}
                  >
                    College / University Student
                  </button>
                  
                  <button 
                    className={`student-type-btn ${studentType === 'graduate' ? 'selected' : ''}`}
                    onClick={() => setStudentType('graduate')}
                  >
                    Graduate Student
                  </button>
                  
                  <button 
                    className={`student-type-btn ${studentType === 'other' ? 'selected' : ''}`}
                    onClick={() => setStudentType('other')}
                  >
                    Other
                  </button>
                </div>
              </div>
            )}

            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        )}

        {/* Step 2: Additional Info (placeholder) */}
        {currentStep === 2 && (
          <div className="step-content">
            <h2 className="section-title">What you interest</h2>
            
            <div className="interests-grid">
              <button 
                className={`interest-chip ${interests.includes('AI') ? 'selected' : ''}`}
                onClick={() => toggleInterest('AI')}
              >
                <span className="chip-icon">🤖</span> AI
              </button>
              
              <button 
                className={`interest-chip ${interests.includes('Hacking') ? 'selected' : ''}`}
                onClick={() => toggleInterest('Hacking')}
              >
                <span className="chip-icon">💻</span> Hacking
              </button>
              
              <button 
                className={`interest-chip ${interests.includes('Engineering') ? 'selected' : ''}`}
                onClick={() => toggleInterest('Engineering')}
              >
                <span className="chip-icon">⚙️</span> Engineering
              </button>
              
              <button 
                className={`interest-chip ${interests.includes('Technology') ? 'selected' : ''}`}
                onClick={() => toggleInterest('Technology')}
              >
                <span className="chip-icon">📱</span> Technology
              </button>
              
              <button 
                className={`interest-chip ${interests.includes('Art') ? 'selected' : ''}`}
                onClick={() => toggleInterest('Art')}
              >
                <span className="chip-icon">🎨</span> Art
              </button>
              
              <button 
                className={`interest-chip ${interests.includes('Health care') ? 'selected' : ''}`}
                onClick={() => toggleInterest('Health care')}
              >
                <span className="chip-icon">🏥</span> Health care
              </button>
              
              <button 
                className={`interest-chip ${interests.includes('Business') ? 'selected' : ''}`}
                onClick={() => toggleInterest('Business')}
              >
                <span className="chip-icon">💼</span> Business
              </button>
              
              <button 
                className={`interest-chip ${interests.includes('Marketing') ? 'selected' : ''}`}
                onClick={() => toggleInterest('Marketing')}
              >
                <span className="chip-icon">📊</span> Marketing
              </button>
            </div>

            <div className="button-group">
              <button className="back-btn" onClick={handleBack}>Back</button>
              <button className="next-btn" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Final Step (placeholder) */}
        {currentStep === 3 && (
          <div className="step-content success-step">
            <h2 className="success-title">Your Profile Create Successfully</h2>
            
            <button className="explore-btn" onClick={() => navigate('/home')}>
              Start Explore Scholarship that you like
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetupPage;

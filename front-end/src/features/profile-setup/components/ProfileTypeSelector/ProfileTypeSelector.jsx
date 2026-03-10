import React from 'react';
import './ProfileTypeSelector.css';

const ProfileTypeSelector = ({ 
  profileType, 
  studentType, 
  parentType, 
  onProfileTypeSelect, 
  onStudentTypeSelect, 
  onParentTypeSelect 
}) => {
  return (
    <div className="profile-type-content">
      <h2 className="profile-section-title">Which Best Describe About You</h2>
      
      <div className="profile-options">
        <div 
          className={`profile-option ${profileType === 'student' ? 'selected' : ''}`}
          onClick={() => onProfileTypeSelect('student')}
        >
          <div className="option-icon">🎓</div>
          <div className="option-label">Current Student</div>
        </div>
        
        <div 
          className={`profile-option ${profileType === 'parent' ? 'selected' : ''}`}
          onClick={() => onProfileTypeSelect('parent')}
        >
          <div className="option-icon">👨‍👩‍👧</div>
          <div className="option-label">Parent or Guardian of Student</div>
        </div>
        
        <div 
          className={`profile-option ${profileType === 'staff' ? 'selected' : ''}`}
          onClick={() => onProfileTypeSelect('staff')}
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
              onClick={() => onStudentTypeSelect('highschool')}
            >
              High School Student
            </button>
            
            <button 
              className={`student-type-btn ${studentType === 'college' ? 'selected' : ''}`}
              onClick={() => onStudentTypeSelect('college')}
            >
              College / University Student
            </button>
            
            <button 
              className={`student-type-btn ${studentType === 'graduate' ? 'selected' : ''}`}
              onClick={() => onStudentTypeSelect('graduate')}
            >
              Graduate Student
            </button>
            
            <button 
              className={`student-type-btn ${studentType === 'other' ? 'selected' : ''}`}
              onClick={() => onStudentTypeSelect('other')}
            >
              Other
            </button>
          </div>
        </div>
      )}

      {/* Parent Type - Only show if Parent or Guardian is selected */}
      {profileType === 'parent' && (
        <div className="student-type-section">
          <h3 className="student-type-title">What is your child's education level?</h3>
          
          <div className="student-type-options">
            <button 
              className={`student-type-btn ${parentType === 'highschool' ? 'selected' : ''}`}
              onClick={() => onParentTypeSelect('highschool')}
            >
              High School
            </button>
            
            <button 
              className={`student-type-btn ${parentType === 'college' ? 'selected' : ''}`}
              onClick={() => onParentTypeSelect('college')}
            >
              College / University
            </button>
            
            <button 
              className={`student-type-btn ${parentType === 'graduate' ? 'selected' : ''}`}
              onClick={() => onParentTypeSelect('graduate')}
            >
              Graduate School
            </button>
            
            <button 
              className={`student-type-btn ${parentType === 'planning' ? 'selected' : ''}`}
              onClick={() => onParentTypeSelect('planning')}
            >
              Planning for Future
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTypeSelector;

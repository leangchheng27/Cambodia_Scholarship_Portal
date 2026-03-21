import React from 'react';
import './ProfileSummary.css';

const ProfileSummary = ({ 
  profileType, 
  studentType, 
  parentType, 
  academicType, 
  universityField, 
  grades,
  recommendedFields 
}) => {
  const isUniversityLevel = (studentType === 'college' || studentType === 'graduate') || 
                           (parentType === 'college' || parentType === 'graduate');
  const isHighSchool = studentType === 'highschool' || parentType === 'highschool';

  return (
    <div className="profile-summary">
      <h3 className="summary-title">Your Profile Summary</h3>
      
      <div className="summary-section">
        <div className="summary-item">
          <span className="summary-label">Profile Type:</span>
          <span className="summary-value">
            {profileType === 'student' ? '🎓 Student' : 
             profileType === 'parent' ? '👨‍👩‍👧 Parent' : '🏫 Staff'}
          </span>
        </div>
        
        {(profileType === 'student' || profileType === 'parent') && (
          <>
            {/* Show university field if college/graduate */}
            {isUniversityLevel && universityField && (
              <div className="summary-item">
                <span className="summary-label">Field of Study:</span>
                <span className="summary-value">{universityField}</span>
              </div>
            )}
            
            {/* Show academic info for high school */}
            {isHighSchool && (
              <>
                <div className="summary-item">
                  <span className="summary-label">Academic Stream:</span>
                  <span className="summary-value">
                    {academicType === 'science' ? '🔬 Science Student' : '📚 Society Student'}
                  </span>
                </div>
                
                {grades && Object.keys(grades).filter(k => grades[k]).length > 0 && (
                  <>
                    {/* Display entered grades */}
                    <div className="summary-item">
                      <span className="summary-label">Your Grades:</span>
                      <div className="grades-list">
                        {Object.entries(grades)
                          .filter(([_, grade]) => grade)
                          .map(([subject, grade]) => (
                            <div key={subject} className="grade-item">
                              <span className="grade-subject">{subject}:</span>
                              <span className="grade-value">{grade}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    

                    
                    {recommendedFields.length > 0 && (
                      <div className="summary-item">
                        <span className="summary-label">Recommended Fields:</span>
                        <div className="recommended-fields-list">
                          {recommendedFields.slice(0, 5).map(field => (
                            <span key={field} className="field-badge">{field}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="ai-notice">
                      <span className="ai-icon"></span>
                      <p>Our AI analyzes your subject grades and uses semantic understanding of Cambodian subjects to find scholarships that match your academic strengths!</p>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSummary;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import EditProfileModal from '../../features/profile/components/EditProfileModal/EditProfileModal.jsx';
import AIRecommendations from '../../features/profile/components/AIRecommendations/AIRecommendations.jsx';
import { calculateGPA, analyzeStrongSubjects } from '../../utils/profileUtils';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, profile, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  // Default user data if not logged in
  const defaultUser = {
    name: 'Guest User',
    email: '',
    phone: '',
    nationality: 'Cambodian',
    interests: [''],
    skills: [''],
    profileType: 'student',
    avatar: null,
  };

  // Merge user and profile data
  const userData = user ? { ...defaultUser, ...user, ...profile } : defaultUser;
  
  // Ensure name is not null - use email prefix if needed
  if (!userData.name && userData.email) {
    userData.name = userData.email.split('@')[0] || 'User';
  } else if (!userData.name) {
    userData.name = 'User';
  }
  
  // Debug log to see what user data we have
  console.log("ProfilePage - User data:", user);
  console.log("ProfilePage - Profile data:", profile);
  console.log("ProfilePage - Merged userData:", userData);
  console.log("ProfilePage - Interests:", userData.interests);

  // Safe calculation helpers
  const getGPA = () => {
    try {
      if (userData.grades && Object.keys(userData.grades).length > 0) {
        return calculateGPA(userData.grades);
      }
      return '0.00';
    } catch (error) {
      console.error('Error calculating GPA:', error);
      return '0.00';
    }
  };

  const getStrongSubjects = () => {
    try {
      if (userData.grades && Object.keys(userData.grades).length > 0) {
        return analyzeStrongSubjects(userData.grades);
      }
      return [];
    } catch (error) {
      console.error('Error analyzing strong subjects:', error);
      return [];
    }
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout();
    console.log('Logout completed, navigating to login');
    // Use setTimeout to ensure state updates complete before navigation
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 0);
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveProfile = (updatedData) => {
    console.log("ProfilePage - Received updated data:", updatedData);
    console.log("ProfilePage - Skills to save:", updatedData.skills);
    console.log("ProfilePage - Interests to save:", updatedData.interests);
    updateProfile(updatedData);
    console.log("ProfilePage - After updateProfile call");
  };

  return (
    <div className="profile-page">
      <Header />
      
      <div className="profile-content">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-main">
          <div className="profile-card">
            {/* User Profile Section */}
            <div className="user-profile-section">
              <div className="user-avatar">
                {userData.avatar ? (
                  <img src={userData.avatar} alt={userData.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="user-info">
                <h2>{userData.name}</h2>
                <p className="user-email">{userData.email}</p>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  <span className="edit-icon">✏️</span> Edit Profile
                </button>
              </div>
            </div>


            {/* Info Detail Section */}
            <div className="info-detail-section">
              <h3>Info Detail :</h3>
              
              <div className="info-item">
                <span className="info-label">Email :</span>
                <span className="info-value">{userData.email}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Tell :</span>
                <span className="info-value">{userData.phone}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Nationality :</span>
                <span className="info-value">{userData.nationality}</span>
              </div>
            </div>

            {/* Interest Section */}
            <div className="interest-section">
              <h3>Interest :</h3>
              <div className="tags-container">
                {userData.interests && userData.interests.length > 0 ? (
                  userData.interests.map((interest, index) => (
                    <span key={index} className="tag interest-tag">
                      <span className="tag-icon">💡</span>
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="no-data">No interests added yet</p>
                )}
              </div>
            </div>

            {/* Skill Section */}
            <div className="skill-section">
              <h3>Skill :</h3>
              <div className="tags-container">
                {userData.skills && userData.skills.length > 0 ? (
                  userData.skills.map((skill, index) => (
                    <span key={index} className="tag skill-tag">
                      <span className="tag-icon">💻</span>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="no-data">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Academic Profile Section - Always Show */}
            <div className="academic-section">
              <h3>Academic Profile :</h3>
              
              {(userData.grades && userData.academicType) || userData.universityField ? (
                <>
                  {/* High School Students - Show Academic Track and Grades */}
                  {userData.grades && userData.academicType && (
                    <>
                      <div className="info-item">
                        <span className="info-label">Academic Track :</span>
                        <span className="info-value" style={{textTransform: 'capitalize', fontWeight: '600'}}>
                          {userData.academicType === 'science' ? '🔬 Science Student' : '📚 Society Student'}
                        </span>
                      </div>

                      {Object.keys(userData.grades).length > 0 && (
                        <>
                          <div className="info-item">
                            <span className="info-label">GPA :</span>
                            <span className="info-value gpa-badge">
                              {getGPA()}
                            </span>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Strong Subjects:</span>
                            <div className="tags-container" style={{display: 'inline-flex', gap: '6px', marginLeft: '8px'}}>
                              {getStrongSubjects().map((subject, index) => (
                                <span key={index} className="tag strong-subject-tag">
                                  ⭐ {subject}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="grades-summary">
                            <h4>Subject Grades:</h4>
                            <div className="grades-grid">
                              {Object.entries(userData.grades).map(([subject, grade]) => (
                                <div key={subject} className="grade-item">
                                  <span className="subject">{subject}</span>
                                  <span className={`grade grade-${grade}`}>{grade}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* University Students - Show Field of Study */}
                  {userData.universityField && (
                    <div className="info-item">
                      <span className="info-label">Field of Study :</span>
                      <span className="info-value" style={{textTransform: 'capitalize', fontWeight: '600'}}>
                        🎓 {userData.universityField}
                      </span>
                    </div>
                  )}

                  {/* Student Type */}
                  {userData.studentType && (
                    <div className="info-item">
                      <span className="info-label">Education Level :</span>
                      <span className="info-value" style={{textTransform: 'capitalize'}}>
                        {userData.studentType === 'highschool' && '📚 High School'}
                        {userData.studentType === 'college' && '🎓 College/University'}
                        {userData.studentType === 'graduate' && '👨‍🎓 Graduate'}
                        {userData.studentType === 'other' && '📖 Other'}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-academic-data">
                  <div className="empty-state">
                    <div className="empty-icon">📚</div>
                    <h4>Add Your Academic Information</h4>
                    <p>Add your student type and grades to get personalized AI-powered scholarship recommendations!</p>
                    <button className="add-grades-btn" onClick={handleEditProfile}>
                      <span className="btn-icon">✏️</span> Add Grades Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Scholarship Recommendations */}
          {((userData.grades && userData.academicType && Object.keys(userData.grades).length > 0) || userData.universityField) && (
            <AIRecommendations userProfile={userData} />
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        userData={userData}
        onSave={handleSaveProfile}
      />

      <Footer />
    </div>
  );
};

export default ProfilePage;

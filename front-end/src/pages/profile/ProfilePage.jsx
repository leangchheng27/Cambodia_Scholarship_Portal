import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import EditProfileModal from '../../features/profile/components/EditProfileModal/EditProfileModal.jsx';
import MajorRecommendations from '../../features/profile/components/MajorRecommendations/MajorRecommendations.jsx';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, profile, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  // Keep profile fields empty by default; do not synthesize a guest account.
  const defaultUser = {
    name: '',
    email: '',
    phone: '',
    nationality: '',
    interests: [],
    skills: [],
    profileType: '',
    avatar: null,
  };

  // Merge user and profile data
  const userData = user ? { ...defaultUser, ...user, ...profile } : defaultUser;
  
  // Ensure name is not null - use email prefix if needed
  if (!userData.name && userData.email) {
    userData.name = userData.email.split('@')[0] || '';
  }
  
  // Debug log to see what user data we have
  console.log("ProfilePage - User data:", user);
  console.log("ProfilePage - Profile data:", profile);
  console.log("ProfilePage - Merged userData:", userData);
  console.log("ProfilePage - Interests:", userData.interests);

  // Check if user has academic information
  const hasAcademicInfo = () => {
    return (userData.grades && userData.academicType && Object.keys(userData.grades).length > 0) || userData.universityField;
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

  const handleSaveProfile = async (updatedData) => {
    try {
      console.log("ProfilePage - Received updated data:", updatedData);
      console.log("ProfilePage - Skills to save:", updatedData.skills);
      console.log("ProfilePage - Interests to save:", updatedData.interests);
      await updateProfile(updatedData);
      console.log("ProfilePage - Profile saved successfully to database");
    } catch (error) {
      console.error("ProfilePage - Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
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

          {/* AI Major Recommendations */}
          {userData.grades && userData.academicType && Object.keys(userData.grades).length > 0 && (
            <MajorRecommendations userProfile={userData} />
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

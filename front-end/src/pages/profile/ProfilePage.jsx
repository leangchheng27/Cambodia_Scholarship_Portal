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
    nationality: '',
    profileType: '',
    avatar: null,
    grades: null,
    academicType: null,
    universityField: null,
    educationLevel: null,
    studentType: null,
    parentType: null,
  };

  // Merge user and profile data
  const userData = user ? { ...defaultUser, ...user, ...profile } : defaultUser;
  
  // Ensure grades is properly parsed as an object
  if (userData.grades && typeof userData.grades === 'string') {
    try {
      userData.grades = JSON.parse(userData.grades);
    } catch (e) {
      console.warn('Failed to parse grades:', e);
      userData.grades = null;
    }
  }
  
  // Ensure interests is properly parsed as an array
  if (userData.interests && typeof userData.interests === 'string') {
    try {
      userData.interests = JSON.parse(userData.interests);
    } catch (e) {
      console.warn('Failed to parse interests:', e);
      userData.interests = [];
    }
  }
  
  // Ensure skills is properly parsed as an array
  if (userData.skills && typeof userData.skills === 'string') {
    try {
      userData.skills = JSON.parse(userData.skills);
    } catch (e) {
      console.warn('Failed to parse skills:', e);
      userData.skills = [];
    }
  }
  
  // Ensure name is not null - use email prefix if needed
  if (!userData.name && userData.email) {
    userData.name = userData.email.split('@')[0] || '';
  }
  
  // Debug log to see what user data we have
  console.log("ProfilePage - User data:", user);
  console.log("ProfilePage - Profile data:", profile);
  console.log("ProfilePage - Merged userData:", userData);
  console.log("ProfilePage - userData.grades:", userData.grades);
  console.log("ProfilePage - userData.grades type:", typeof userData.grades);
  console.log("ProfilePage - userData.academicType:", userData.academicType);

  // Check if user has academic information
  const hasAcademicInfo = () => {
    return (userData.grades && userData.academicType && Object.keys(userData.grades).length > 0) || userData.universityField || userData.educationLevel;
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

              {userData.educationLevel && (
                <div className="info-item">
                  <span className="info-label">Education Level :</span>
                  <span className="info-value" style={{fontWeight: '600'}}>
                    {userData.educationLevel === 'High School Student' && '📚 ' + userData.educationLevel}
                    {userData.educationLevel === 'College/University Student' && '🎓 ' + userData.educationLevel}
                    {userData.educationLevel === 'Graduate Student' && '👨‍🎓 ' + userData.educationLevel}
                    {userData.educationLevel === 'Other' && '📖 ' + userData.educationLevel}
                  </span>
                </div>
              )}

              {userData.nationality && (
                <div className="info-item">
                  <span className="info-label">Nationality :</span>
                  <span className="info-value">{userData.nationality}</span>
                </div>
              )}

              {userData.phone && (
                <div className="info-item">
                  <span className="info-label">Phone :</span>
                  <span className="info-value">{userData.phone}</span>
                </div>
              )}
            </div>

            {/* Academic Profile Section - Always Show */}
            <div className="academic-section">
              <h3>Academic Profile :</h3>
              
              {(userData.grades && userData.academicType) || userData.universityField || userData.educationLevel ? (
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

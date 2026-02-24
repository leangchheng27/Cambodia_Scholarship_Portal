import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import EditProfileModal from '../../features/profile/components/EditProfileModal/EditProfileModal.jsx';
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
  
  // Debug log to see what user data we have
  console.log("ProfilePage - User data:", user);
  console.log("ProfilePage - Profile data:", profile);
  console.log("ProfilePage - Merged userData:", userData);
  console.log("ProfilePage - Interests:", userData.interests);

  const handleLogout = () => {
    logout();
    navigate('/login');
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
          <button className="logout-btn" onClick={handleLogout}>
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

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-btn favorite-btn">
                <span className="btn-icon">❤️</span>
                <span>Favorite</span>
                <span className="arrow"></span>
              </button>
              
              <button className="action-btn language-btn">
                <span className="btn-icon">🌐</span>
                <span>Language</span>
                <span className="arrow"></span>
              </button>
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
          </div>
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

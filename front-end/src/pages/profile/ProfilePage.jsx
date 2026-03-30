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

  const userData = user ? { ...defaultUser, ...user, ...profile } : defaultUser;
  
  if (!userData.name && userData.email) {
    userData.name = userData.email.split('@')[0] || '';
  }

  const handleLogout = () => {
    logout();
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
      await updateProfile(updatedData);
    } catch (error) {
      console.error("Error saving profile:", error);
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

        <div className="profile-container">
          {/* User Profile Card */}
          <div className="user-profile-card">
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
              <h2>{userData.name || '—'}</h2>
              <p className="user-role">{userData.studentType === 'highschool' ? 'High School Student' : userData.studentType === 'college' ? 'College Student' : userData.studentType === 'graduate' ? 'Graduate Student' : 'Student'}</p>
              <p className="user-location">{userData.nationality || '—'}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Personal Information</h3>
              <button className="edit-btn" onClick={handleEditProfile}>
                Edit
              </button>
            </div>

            <div className="form-grid">
              {userData.name && (
                <div className="form-field">
                  <label>Name</label>
                  <p>{userData.name}</p>
                </div>
              )}

              {userData.email && (
                <div className="form-field">
                  <label>Email</label>
                  <p>{userData.email}</p>
                </div>
              )}

              {userData.phone && (
                <div className="form-field">
                  <label>Phone</label>
                  <p>{userData.phone}</p>
                </div>
              )}

              {userData.nationality && (
                <div className="form-field">
                  <label>Nationality</label>
                  <p>{userData.nationality}</p>
                </div>
              )}

              {userData.studentType && (
                <div className="form-field">
                  <label>Student Type</label>
                  <p>
                    {userData.studentType === 'highschool' && 'High School'}
                    {userData.studentType === 'college' && 'College/University'}
                    {userData.studentType === 'graduate' && 'Graduate'}
                    {userData.studentType === 'other' && 'Other'}
                  </p>
                </div>
              )}

              {userData.academicType && (
                <div className="form-field">
                  <label>Academic Track</label>
                  <p>
                    {userData.academicType === 'science' && 'Science'}
                    {userData.academicType === 'society' && 'Social Science'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Academic Profile Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Academic Profile</h3>
              <button className="edit-btn" onClick={handleEditProfile}>
                Edit
              </button>
            </div>

            <div className="form-grid">
              {userData.universityField && (
                <div className="form-field">
                  <label>Field of Study</label>
                  <p>{userData.universityField}</p>
                </div>
              )}

              {userData.grades && Object.keys(userData.grades).length > 0 ? (
                <div className="form-field full-width">
                  <label>Subject Grades</label>
                  <div className="grades-display">
                    {Object.entries(userData.grades).map(([subject, grade]) => (
                      <div key={subject} className="grade-badge">
                        <span className="grade-subject">{subject}</span>
                        <span className={`grade-value grade-${grade}`}>{grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="form-field full-width">
                  <p className="empty-state">Add your academic information to unlock AI recommendations</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          {userData.grades && userData.academicType && Object.keys(userData.grades).length > 0 && (
            <MajorRecommendations userProfile={userData} />
          )}
        </div>
      </div>

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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../layout/Header/Navbar';
import Footer from '../../layout/Footer/Footer';
import './profile.css';

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    nationality: '',
    interests: [],
    skills: [],
  });

  // Default user data if not logged in
  const defaultUser = {
    name: 'Guest User',
    email: '',
    phone: '',
    nationality: 'Cambodian',
    interests: ['Technology'],
    skills: ['Basic coding'],
    profileType: 'student',
    avatar: null,
  };

  const userData = user || defaultUser;
  
  // Debug log to see what user data we have
  console.log("ProfilePage - User data:", user);
  console.log("ProfilePage - Interests:", userData.interests);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Pre-fill the form with current user data
    setEditForm({
      name: userData.name,
      phone: userData.phone || '',
      nationality: userData.nationality || 'Cambodian',
      interests: userData.interests || [],
      skills: userData.skills || [],
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveProfile = () => {
    // Update profile with new data
    updateProfile(editForm);
    setShowEditModal(false);
  };

  const toggleInterest = (interest) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleSkill = (skill) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="profile-page">
      <Navbar />
      
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
      {showEditModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <div className="modal-body">
              {/* Name Input */}
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone Input */}
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Nationality Input */}
              <div className="form-group">
                <label>Nationality</label>
                <input
                  type="text"
                  value={editForm.nationality}
                  onChange={(e) => setEditForm({ ...editForm, nationality: e.target.value })}
                  placeholder="Enter your nationality"
                />
              </div>

              {/* Interests Selection */}
              <div className="form-group">
                <label>Interests</label>
                <div className="interests-grid">
                  {['AI', 'Hacking', 'Engineering', 'Technology', 'Art', 'Health care', 'Business', 'Marketing'].map(interest => (
                    <button
                      key={interest}
                      className={`interest-chip ${editForm.interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Selection */}
              <div className="form-group">
                <label>Skills</label>
                <div className="interests-grid">
                  {['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Data Analysis', 'UI/UX Design', 'Project Management'].map(skill => (
                    <button
                      key={skill}
                      className={`interest-chip ${editForm.skills.includes(skill) ? 'selected' : ''}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              <button className="save-btn" onClick={handleSaveProfile}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;

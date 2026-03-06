import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    nationality: '',
    interests: [],
    skills: [],
  });

  // Update form when userData changes
  useEffect(() => {
    if (userData && isOpen) {
      console.log("EditProfileModal - Opening with userData:", userData);
      console.log("EditProfileModal - Skills from userData:", userData.skills);
      console.log("EditProfileModal - Interests from userData:", userData.interests);
      
      setEditForm({
        name: userData.name || '',
        phone: userData.phone || '',
        nationality: userData.nationality || 'Cambodian',
        interests: Array.isArray(userData.interests) ? [...userData.interests] : [],
        skills: Array.isArray(userData.skills) ? [...userData.skills] : [],
      });
    }
  }, [userData, isOpen]);

  const handleSaveProfile = () => {
    console.log("EditProfileModal - Saving profile data:", editForm);
    console.log("EditProfileModal - Skills being saved:", editForm.skills);
    console.log("EditProfileModal - Interests being saved:", editForm.interests);
    onSave(editForm);
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose}>×</button>
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
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSaveProfile}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

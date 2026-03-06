import React, { useState } from 'react';
import './ProfileDetails.css';

const ProfileDetails = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    education: user?.education || '',
    fieldOfStudy: user?.fieldOfStudy || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      education: user?.education || '',
      fieldOfStudy: user?.fieldOfStudy || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-details">
      <div className="profile-details-header">
        <h3>Profile Details</h3>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="detail-row">
          <label>Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.name || 'Not provided'}</p>
          )}
        </div>

        <div className="detail-row">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.email || 'Not provided'}</p>
          )}
        </div>

        <div className="detail-row">
          <label>Phone</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.phone || 'Not provided'}</p>
          )}
        </div>

        <div className="detail-row">
          <label>Education Level</label>
          {isEditing ? (
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
            >
              <option value="">Select Level</option>
              <option value="high-school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="phd">PhD</option>
            </select>
          ) : (
            <p>{formData.education || 'Not provided'}</p>
          )}
        </div>

        <div className="detail-row">
          <label>Field of Study</label>
          {isEditing ? (
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.fieldOfStudy || 'Not provided'}</p>
          )}
        </div>

        {isEditing && (
          <div className="action-buttons">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileDetails;

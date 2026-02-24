import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <div className="avatar-placeholder">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
      </div>
      <div className="profile-info">
        <h2>{user?.name || 'User Name'}</h2>
        <p className="profile-email">{user?.email || 'user@example.com'}</p>
        <p className="profile-member-since">
          Member since {user?.memberSince || 'January 2024'}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;

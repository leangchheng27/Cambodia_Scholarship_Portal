import React from 'react';
import './ProfileSetupLayout.css';

const ProfileSetupLayout = ({ children }) => {
  return (
    <div className="profile-setup-container">
      <div className="profile-card">
        {children}
      </div>
    </div>
  );
};

export default ProfileSetupLayout;

import React from 'react';
import './ProfileProgressIndicator.css';

const ProfileProgressIndicator = ({ currentStep }) => {
  return (
    <div className="progress-indicator">
      <div className={`step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>1</div>
      <div className="progress-dot"></div>
      <div className="progress-dot"></div>
      <div className="progress-dot"></div>
      <div className="progress-dot"></div>
      <div className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>2</div>
      <div className="progress-dot"></div>
      <div className="progress-dot"></div>
      <div className="progress-dot"></div>
      <div className="progress-dot"></div>
      <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3</div>
    </div>
  );
};

export default ProfileProgressIndicator;

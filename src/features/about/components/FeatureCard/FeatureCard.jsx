import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card-about">
      <div className="feature-icon-about">{icon}</div>
      <h4 className="feature-title-about">{title}</h4>
      <p className="feature-description-about">{description}</p>
    </div>
  );
};

export default FeatureCard;

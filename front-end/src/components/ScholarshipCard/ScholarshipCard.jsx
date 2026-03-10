import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ScholarshipCard.css';

const ScholarshipCard = ({ 
  scholarship, 
  showMatchScore = false, 
  basePath = '/scholarships/cambodia' 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`${basePath}/detail/${scholarship.id}`);
  };

  const getMatchColor = (score) => {
    if (!score) return '#6b7280';
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 55) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div className="scholarship-card" onClick={handleCardClick}>
      <div className="card-image-wrapper">
        <img 
          src={scholarship.image} 
          alt={scholarship.title} 
          className="card-image" 
        />
        {showMatchScore && scholarship.matchScore && (
          <div 
            className="match-badge-overlay"
            style={{ backgroundColor: getMatchColor(scholarship.matchScore) }}
          >
            {scholarship.matchScore}%
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{scholarship.title}</h3>
        <p className="card-description">{scholarship.description}</p>
        <button className="view-detail-btn">
          View more detail
        </button>
      </div>
    </div>
  );
};

export default ScholarshipCard;

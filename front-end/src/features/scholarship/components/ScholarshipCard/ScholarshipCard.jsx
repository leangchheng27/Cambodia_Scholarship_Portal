import React from 'react';
import './ScholarshipCard.css';

const ScholarshipCard = ({ scholarship, onClick }) => {
  return (
    <div className="scholarship-card-item" onClick={onClick}>
      <div className="scholarship-card-image">
        <img src={scholarship.image || '/placeholder.jpg'} alt={scholarship.title} />
      </div>
      <div className="scholarship-card-content">
        <h3 className="scholarship-card-title">{scholarship.title}</h3>
        <p className="scholarship-card-description">{scholarship.description}</p>
        <div className="scholarship-card-meta">
          {scholarship.deadline && (
            <span className="deadline">Deadline: {scholarship.deadline}</span>
          )}
          {scholarship.level && (
            <span className="level">{scholarship.level}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;

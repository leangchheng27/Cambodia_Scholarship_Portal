import React from 'react';
import ScholarshipCard from '../ScholarshipCard/ScholarshipCard.jsx';
import './ScholarshipList.css';

const ScholarshipList = ({ scholarships, onScholarshipClick }) => {
  if (!scholarships || scholarships.length === 0) {
    return (
      <div className="no-scholarships">
        <p>No scholarships available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="scholarship-list-container">
      <div className="scholarship-list-grid">
        {scholarships.map((scholarship, index) => (
          <ScholarshipCard
            key={scholarship.id || index}
            scholarship={scholarship}
            onClick={() => onScholarshipClick && onScholarshipClick(scholarship.id || index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScholarshipList;

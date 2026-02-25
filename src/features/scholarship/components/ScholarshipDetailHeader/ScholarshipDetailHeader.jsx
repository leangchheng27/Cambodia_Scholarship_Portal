import React from 'react';
import './ScholarshipDetailHeader.css';

const ScholarshipDetailHeader = ({ title, subtitle }) => {
  return (
    <div className="detail-header">
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default ScholarshipDetailHeader;

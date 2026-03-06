import React from 'react';
import './EligibilityContent.css';

const EligibilityContent = ({ eligibility }) => {
  return (
    <div className="tab-content">
      <div className="content-section">
        <h3>Eligibility:</h3>
        {eligibility.map((criteria, index) => (
          <div key={index} className="info-item">
            <p>• {criteria}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EligibilityContent;

import React from 'react';
import './ProgramContent.css';

const ProgramContent = ({ programs }) => {
  return (
    <div className="tab-content">
      <div className="program-timeline">
        {programs.map((program, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <p>{program}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramContent;

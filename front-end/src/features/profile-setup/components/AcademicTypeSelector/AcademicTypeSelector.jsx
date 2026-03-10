import React from 'react';
import './AcademicTypeSelector.css';

const AcademicTypeSelector = ({ academicType, onAcademicTypeChange }) => {
  return (
    <div className="academic-type-section">
      <h3 className="section-subtitle">Select Your High School Stream</h3>
      <div className="academic-type-buttons">
        <button
          className={`academic-type-btn ${academicType === 'science' ? 'selected' : ''}`}
          onClick={() => onAcademicTypeChange('science')}
        >
          <span className="type-icon">🔬</span>
          <span className="type-label">Science Student</span>
        </button>
        <button
          className={`academic-type-btn ${academicType === 'society' ? 'selected' : ''}`}
          onClick={() => onAcademicTypeChange('society')}
        >
          <span className="type-icon">📚</span>
          <span className="type-label">Social-Science Student</span>
        </button>
      </div>
    </div>
  );
};

export default AcademicTypeSelector;

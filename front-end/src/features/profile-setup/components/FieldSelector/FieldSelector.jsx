import React from 'react';
import './FieldSelector.css';

const UNIVERSITY_FIELDS = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Medicine',
  'Law',
  'Economics',
  'Education',
  'Agriculture',
  'Architecture',
  'Pharmacy',
  'Nursing',
  'Psychology',
  'Accounting',
  'Marketing',
  'Other'
];

const FieldSelector = ({ profileType, universityField, onFieldChange }) => {
  return (
    <div className="field-selection-section">
      <h3 className="section-subtitle">
        {profileType === "student" 
          ? "Select Your Major/Field of Study" 
          : "Select Your Child's Major/Field of Study"}
      </h3>
      <div className="field-dropdown-container">
        <select
          value={universityField}
          onChange={(e) => onFieldChange(e.target.value)}
          className="field-select"
        >
          <option value="">-- Select Your Field --</option>
          {UNIVERSITY_FIELDS.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>
      <p className="field-helper-text">
        💡 This helps us recommend relevant internships and opportunities in your field
      </p>
    </div>
  );
};

export default FieldSelector;

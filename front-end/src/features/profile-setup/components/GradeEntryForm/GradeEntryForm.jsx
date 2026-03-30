import React from 'react';
import './GradeEntryForm.css';

const SUBJECTS = {
  science: ['Math', 'Biology', 'Khmer Literature', 'Physics', 'Chemistry', 'History', 'English'],
  society: ['Math', 'History', 'Khmer Literature', 'Geography', 'Morality', 'Earth Science', 'English']
};

const GradeEntryForm = ({ academicType, grades, onGradeChange }) => {
  // Return empty if academicType is not selected
  if (!academicType) {
    return (
      <div className="grades-section">
        <p className="helper-text">Please select your academic stream first</p>
      </div>
    );
  }

  return (
    <div className="grades-section">
      <h3 className="section-subtitle">Enter Your Subject Grades (A-F)</h3>
      <div className="grades-container-setup">
        {SUBJECTS[academicType]?.map(subject => (
          <div key={subject} className="grade-input-row">
            <label className="subject-label">{subject}</label>
            <select
              value={grades[subject] || ''}
              onChange={(e) => onGradeChange(subject, e.target.value)}
              className="grade-select-setup"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeEntryForm;

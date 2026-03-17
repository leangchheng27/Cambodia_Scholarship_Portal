import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';
import { SUBJECTS } from '../../../../utils/scholarshipMatcher';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    nationality: '',
    interests: [],
    skills: [],
    studentType: 'science', // 'science' or 'society'
    grades: {}, // { 'Math': 'A', 'Physics': 'B', ... }
  });

  // Update form when userData changes
  useEffect(() => {
    if (userData && isOpen) {
      console.log("EditProfileModal - Opening with userData:", userData);
      console.log("EditProfileModal - Skills from userData:", userData.skills);
      console.log("EditProfileModal - Interests from userData:", userData.interests);
      
      // Use academicType if available, otherwise fall back to studentType
      const studentType = userData.academicType || userData.studentType || 'science';
      const defaultGrades = {};
      
      // Initialize grades for all subjects if not present
      SUBJECTS[studentType].forEach(subject => {
        defaultGrades[subject] = userData.grades?.[subject] || '';
      });
      
      setEditForm({
        name: userData.name || '',
        phone: userData.phone || '',
        nationality: userData.nationality || 'Cambodian',
        interests: Array.isArray(userData.interests) ? [...userData.interests] : [],
        skills: Array.isArray(userData.skills) ? [...userData.skills] : [],
        studentType: studentType,
        grades: defaultGrades,
      });
    }
  }, [userData, isOpen]);

  const handleSaveProfile = () => {
    console.log("EditProfileModal - Saving profile data:", editForm);
    console.log("EditProfileModal - Skills being saved:", editForm.skills);
    console.log("EditProfileModal - Interests being saved:", editForm.interests);
    console.log("EditProfileModal - Grades being saved:", editForm.grades);
    console.log("EditProfileModal - Student Type:", editForm.studentType);
    
    // Save with both studentType and academicType for compatibility
    const dataToSave = {
      ...editForm,
      academicType: editForm.studentType, // For backward compatibility
    };
    
    console.log("EditProfileModal - Final data to save:", dataToSave);
    onSave(dataToSave);
    onClose();
  };

  const toggleInterest = (interest) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };
const handleStudentTypeChange = (newType) => {
    const newGrades = {};
    SUBJECTS[newType].forEach(subject => {
      newGrades[subject] = editForm.grades[subject] || '';
    });
    
    setEditForm(prev => ({
      ...prev,
      studentType: newType,
      grades: newGrades
    }));
  };

  const handleGradeChange = (subject, grade) => {
    setEditForm(prev => ({
      ...prev,
      grades: {
        ...prev.grades,
        [subject]: grade
      }
    }));
  };

  
  const toggleSkill = (skill) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Name Input */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          {/* Student Type Selection */}
          <div className="form-group">
            <label>Student Type (High School Graduate)</label>
            <div className="student-type-selector">
              <button
                type="button"
                className={`student-type-btn ${editForm.studentType === 'science' ? 'selected' : ''}`}
                onClick={() => handleStudentTypeChange('science')}
              >
                <span className="type-icon">🔬</span>
                <span>Science Student</span>
              </button>
              <button
                type="button"
                className={`student-type-btn ${editForm.studentType === 'society' ? 'selected' : ''}`}
                onClick={() => handleStudentTypeChange('society')}
              >
                <span className="type-icon">📚</span>
                <span>Social-Science Student</span>
              </button>
            </div>
          </div>

          {/* Grade Input Section */}
          <div className="form-group">
            <label>Subject Grades (High School)</label>
            <div className="grades-container">
              {SUBJECTS[editForm.studentType].map(subject => (
                <div key={subject} className="grade-row">
                  <span className="subject-name">{subject}</span>
                  <select
                    value={editForm.grades[subject] || ''}
                    onChange={(e) => handleGradeChange(subject, e.target.value)}
                    className="grade-select"
                  >
                    <option value="">Select Grade</option>
                    <option value="A">A - Excellent</option>
                    <option value="B">B - Good</option>
                    <option value="C">C - Average</option>
                    <option value="D">D - Below Average</option>
                    <option value="E">E - Poor</option>
                    <option value="F">F - Fail</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Nationality Input */}
          <div className="form-group">
            <label>Nationality</label>
            <input
              type="text"
              value={editForm.nationality}
              onChange={(e) => setEditForm({ ...editForm, nationality: e.target.value })}
              placeholder="Enter your nationality"
            />
          </div>

          {/* Interests Selection */}
          <div className="form-group">
            <label>Interests</label>
            <div className="interests-grid">
              {['AI', 'Hacking', 'Engineering', 'Technology', 'Art', 'Health care', 'Business', 'Marketing'].map(interest => (
                <button
                  key={interest}
                  className={`interest-chip ${editForm.interests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Selection */}
          <div className="form-group">
            <label>Skills</label>
            <div className="interests-grid">
              {['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Data Analysis', 'UI/UX Design', 'Project Management'].map(skill => (
                <button
                  key={skill}
                  className={`interest-chip ${editForm.skills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSaveProfile}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

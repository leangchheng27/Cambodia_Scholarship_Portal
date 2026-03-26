import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';
import { SUBJECTS } from '../../../../utils/scholarshipMatcher';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  // Determine if user is university or high school
  const isUniversityStudent = userData?.studentType === 'college';
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    nationality: '',
    interests: [],
    skills: [],
    studentType: 'science', // 'science', 'society', 'college'
    academicType: 'science', // For high school only
    grades: {}, // For high school only
    universityField: '', // For college only
  });
  const [isSaving, setIsSaving] = useState(false);

  // Update form when userData changes
  useEffect(() => {
    if (userData && isOpen) {
      console.log("EditProfileModal - Opening with userData:", userData);
      
      const studentType = userData.studentType || userData.academicType || 'science';
      const isUniv = studentType === 'college';
      const defaultGrades = {};
      
      // Initialize grades for high school students
      // ONLY load grades for subjects in the CURRENT academic track
      if (!isUniv && SUBJECTS[studentType]) {
        SUBJECTS[studentType].forEach(subject => {
          // Only load grade if it exists AND the subject is in the current track
          defaultGrades[subject] = userData.grades?.[subject] || '';
        });
      }
      
      setEditForm({
        name: userData.name || '',
        phone: userData.phone || '',
        nationality: userData.nationality || 'Cambodian',
        interests: Array.isArray(userData.interests) ? [...userData.interests] : [],
        skills: Array.isArray(userData.skills) ? [...userData.skills] : [],
        studentType: studentType,
        academicType: studentType === 'college' ? '' : studentType,
        grades: defaultGrades,
        universityField: userData.universityField || '',
      });
    }
  }, [userData, isOpen]);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      console.log("EditProfileModal - Saving profile data:", editForm);
      
      const isUniv = editForm.studentType === 'college';
      
      // Clean up grades: only keep grades for subjects in the CURRENT track
      let cleanedGrades = {};
      if (!isUniv && SUBJECTS[editForm.studentType]) {
        SUBJECTS[editForm.studentType].forEach(subject => {
          cleanedGrades[subject] = editForm.grades[subject] || '';
        });
      }
      
      // Save with appropriate fields
      const dataToSave = {
        ...editForm,
        academicType: isUniv ? '' : (editForm.studentType || 'science'),
        grades: cleanedGrades, // Only grades for current track
      };
      
      // Remove high school fields if university student
      if (isUniv) {
        dataToSave.grades = {};
        dataToSave.academicType = '';
      } else {
        // Keep only relevant fields for high school
        dataToSave.universityField = '';
      }
      
      console.log("EditProfileModal - Final data to save:", dataToSave);
      await onSave(dataToSave);
      console.log("EditProfileModal - Profile saved successfully");
      onClose();
    } catch (error) {
      console.error("EditProfileModal - Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
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
    // Always reset to empty grades, do NOT carry over old track grades
    if (newType === 'science' || newType === 'society') {
      SUBJECTS[newType].forEach(subject => {
        newGrades[subject] = ''; // Always empty, fresh start
      });
    }
    
    setEditForm(prev => ({
      ...prev,
      studentType: newType,
      academicType: newType === 'college' ? '' : newType,
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
            <label>Education Level</label>
            <div className="student-type-selector">
              <button
                type="button"
                className={`student-type-btn ${editForm.studentType === 'science' ? 'selected' : ''}`}
                onClick={() => handleStudentTypeChange('science')}
              >
                <span className="type-icon">🔬</span>
                <span>High School (Science)</span>
              </button>
              <button
                type="button"
                className={`student-type-btn ${editForm.studentType === 'society' ? 'selected' : ''}`}
                onClick={() => handleStudentTypeChange('society')}
              >
                <span className="type-icon">📚</span>
                <span>High School (Society)</span>
              </button>
              <button
                type="button"
                className={`student-type-btn ${editForm.studentType === 'college' ? 'selected' : ''}`}
                onClick={() => handleStudentTypeChange('college')}
              >
                <span className="type-icon">🎓</span>
                <span>College/University</span>
              </button>
            </div>
          </div>

          {/* HIGH SCHOOL: Subject Grades Input Section */}
          {(editForm.studentType === 'science' || editForm.studentType === 'society') && (
            <div className="form-group">
              <label>Subject Grades</label>
              <div className="grades-container">
                {SUBJECTS[editForm.studentType || 'science']?.map(subject => (
                  <div key={subject} className="grade-row">
                    <span className="subject-name">{subject}</span>
                    <select
                      value={editForm.grades[subject] || ''}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        grades: { ...editForm.grades, [subject]: e.target.value }
                      })}
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
          )}

          {/* UNIVERSITY: Field of Study Input Section */}
          {editForm.studentType === 'college' && (
            <div className="form-group">
              <label>Field of Study</label>
              <select
                value={editForm.universityField}
                onChange={(e) => setEditForm({ ...editForm, universityField: e.target.value })}
                className="field-select"
              >
                <option value="">Select your field of study</option>
                <option value="Engineering">Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business">Business & Commerce</option>
                <option value="Medicine">Medicine & Health Sciences</option>
                <option value="Law">Law</option>
                <option value="Education">Education</option>
                <option value="Economics">Economics</option>
                <option value="Arts">Arts & Humanities</option>
                <option value="Science">Pure Sciences</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Architecture">Architecture & Design</option>
                <option value="Social Sciences">Social Sciences</option>
              </select>
              <p className="field-hint">Your field of study helps match you with internships and scholarships for your career path.</p>
            </div>
          )}

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
          <button className="cancel-btn" onClick={onClose} disabled={isSaving}>Cancel</button>
          <button 
            className="save-btn" 
            onClick={handleSaveProfile}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

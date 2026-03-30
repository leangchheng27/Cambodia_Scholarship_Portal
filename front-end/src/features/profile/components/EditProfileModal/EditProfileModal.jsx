import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';
import { SUBJECTS } from '../../../../utils/scholarshipMatcher';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [step, setStep] = useState(1); // Step 1: Education Level, Step 2: Details
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    studentType: '',
    academicType: '', // For high school only
    grades: {}, // For high school only
    universityField: '', // For college only
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  // Update form when userData changes
  useEffect(() => {
    if (userData && isOpen) {
      const studentType = userData.studentType || 'highschool';
      const academicType = userData.academicType || 'science';
      const defaultGrades = {};
      
      // Initialize grades for high school students
      if (studentType === 'highschool' && SUBJECTS[academicType]) {
        SUBJECTS[academicType].forEach(subject => {
          defaultGrades[subject] = userData.grades?.[subject] || '';
        });
      }
      
      setEditForm({
        name: userData.name || '',
        phone: userData.phone || '',
        studentType: studentType,
        academicType: studentType === 'college' ? '' : academicType,
        grades: defaultGrades,
        universityField: userData.universityField || '',
      });
      
      // If user already has a studentType set, go directly to step 2 (editing mode)
      // Otherwise start at step 1 (new user)
      setStep(userData.studentType ? 2 : 1);
      setShowValidationError(false); // Reset error when modal opens
    }
  }, [userData, isOpen]);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      
      const isUniv = editForm.studentType === 'college';
      
      // Validate high school: all grades must be filled
      if (!isUniv && editForm.academicType && SUBJECTS[editForm.academicType]) {
        const allGradesFilled = SUBJECTS[editForm.academicType].every(
          subject => editForm.grades[subject] && editForm.grades[subject].trim() !== ''
        );
        
        if (!allGradesFilled) {
          setShowValidationError(true);
          setIsSaving(false);
          return;
        }
      }
      
      // Validate college: field of study must be filled
      if (isUniv && !editForm.universityField) {
        setShowValidationError(true);
        setIsSaving(false);
        return;
      }
      
      // If validation passes, hide error and proceed
      setShowValidationError(false);
      let cleanedGrades = {};
      if (!isUniv && editForm.academicType && SUBJECTS[editForm.academicType]) {
        SUBJECTS[editForm.academicType].forEach(subject => {
          cleanedGrades[subject] = editForm.grades[subject] || '';
        });
      }
      
      // Save with appropriate fields
      const dataToSave = {
        ...editForm,
        academicType: isUniv ? '' : editForm.academicType,
        grades: cleanedGrades,
      };
      
      // Remove high school fields if university student
      if (isUniv) {
        dataToSave.grades = {};
        dataToSave.academicType = '';
      } else {
        dataToSave.universityField = '';
      }
      
      await onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("EditProfileModal - Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEducationLevelSelect = (type) => {
    if (type === 'highschool') {
      // For high school, default to science stream
      const newGrades = {};
      if (SUBJECTS['science']) {
        SUBJECTS['science'].forEach(subject => {
          newGrades[subject] = '';
        });
      }
      
      setEditForm(prev => ({
        ...prev,
        studentType: 'highschool',
        academicType: 'science',
        grades: newGrades
      }));
    } else {
      // For college, no grades or stream
      setEditForm(prev => ({
        ...prev,
        studentType: 'college',
        academicType: '',
        grades: {}
      }));
    }
    setStep(2);
  };

  const handleStreamSelect = (stream) => {
    const newGrades = {};
    if (SUBJECTS[stream]) {
      SUBJECTS[stream].forEach(subject => {
        newGrades[subject] = '';
      });
    }
    
    setEditForm(prev => ({
      ...prev,
      academicType: stream,
      grades: newGrades
    }));
  };

  const isFormValid = () => {
    if (step === 1) {
      return true; // Step 1 is always valid
    }
    
    // Step 2 validation
    const isUniv = editForm.studentType === 'college';
    
    // For high school: check all grades are filled
    if (!isUniv && editForm.academicType && SUBJECTS[editForm.academicType]) {
      const allGradesFilled = SUBJECTS[editForm.academicType].every(
        subject => editForm.grades[subject] && editForm.grades[subject].trim() !== ''
      );
      return allGradesFilled;
    }
    
    // For college: check field of study is selected
    if (isUniv) {
      return !!editForm.universityField;
    }
    
    return true;
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* STEP 1: Select Education Level */}
          {step === 1 && (
            <>
              <div className="step-indicator">
                <div className="step-number">1</div>
                <div className="step-title">Select Your Education Level</div>
              </div>

              <div className="form-group">
                <label>What is your current education level?</label>
                <div className="education-selector">
                  <button
                    type="button"
                    className="education-btn"
                    onClick={() => handleEducationLevelSelect('highschool')}
                  >
                    <span className="edu-icon">📚</span>
                    <span className="edu-title">High School</span>
                    <span className="edu-desc">Secondary school student</span>
                  </button>

                  <button
                    type="button"
                    className="education-btn"
                    onClick={() => handleEducationLevelSelect('college')}
                  >
                    <span className="edu-icon">🎓</span>
                    <span className="edu-title">College/University</span>
                    <span className="edu-desc">Tertiary education student</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Enter Details Based on Education Level */}
          {step === 2 && (
            <>
              <div className="step-indicator">
                <div className="step-number">2</div>
                <div className="step-title">Your Academic Information</div>
              </div>

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

              {/* HIGH SCHOOL: Stream Selection and Grades */}
              {editForm.studentType === 'highschool' && (
                <>
                  <div className="form-group">
                    <label>Academic Stream</label>
                    <div className="stream-selector">
                      <button
                        type="button"
                        className={`stream-btn ${editForm.academicType === 'science' ? 'selected' : ''}`}
                        onClick={() => handleStreamSelect('science')}
                      >
                        <span className="icon">🔬</span>
                        <span>Science</span>
                      </button>
                      <button
                        type="button"
                        className={`stream-btn ${editForm.academicType === 'society' ? 'selected' : ''}`}
                        onClick={() => handleStreamSelect('society')}
                      >
                        <span className="icon">🤝</span>
                        <span>Social Science</span>
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Subject Grades</label>
                    <div className="grades-container">
                      {SUBJECTS[editForm.academicType || 'science']?.map(subject => (
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
                  {showValidationError && step === 2 && editForm.studentType === 'highschool' && (
                    <div className="error-message" style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '13px' }}>
                      Please enter grades for all subjects to continue
                    </div>
                  )}
                </>
              )}

              {/* UNIVERSITY: Field of Study */}
              {editForm.studentType === 'college' && (
                <div className="form-group">
                  <label>Field of Study</label>
                  <select
                    value={editForm.universityField}
                    onChange={(e) => setEditForm({ ...editForm, universityField: e.target.value })}
                    className="field-select"
                  >
                    <option value="">Select your field of study</option>
                    <option value="IT & Computer Science">IT & Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Health & Medical Sciences">Health & Medical Sciences</option>
                    <option value="Agriculture & Environmental">Agriculture & Environmental</option>
                    <option value="Architecture & Urban Planning">Architecture & Urban Planning</option>
                    <option value="Business & Economics">Business & Economics</option>
                    <option value="Education">Education</option>
                    <option value="Arts & Media">Arts & Media</option>
                    <option value="Law & Legal Studies">Law & Legal Studies</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Tourism & Hospitality">Tourism & Hospitality</option>
                    <option value="Languages & Literature">Languages & Literature</option>
                  </select>
                  <p className="field-hint">Your field of study helps match you with internships and scholarships for your career path.</p>
                  {showValidationError && step === 2 && editForm.studentType === 'college' && (
                    <div className="error-message" style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '13px' }}>
                      Please select your field of study to continue
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          {step === 2 && (
            <button className="back-btn" onClick={() => setStep(1)} disabled={isSaving}>
              Back
            </button>
          )}
          {step === 1 && <div style={{ flex: 1 }}></div>}
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

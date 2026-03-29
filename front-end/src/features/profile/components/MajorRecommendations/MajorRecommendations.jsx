import React, { useState, useEffect } from 'react';
import { getCustomModelRecommendations } from '../../../../api/recommendationApi';
import API from '../../../../services/api';
import LoadingText from '../../../../components/ui/LoadingText/LoadingText.jsx';
import './MajorRecommendations.css';

const MajorRecommendations = ({ userProfile }) => {
  const [recommendedMajors, setRecommendedMajors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [availableMajors, setAvailableMajors] = useState([]);
  const [majorsLoading, setMajorsLoading] = useState(true);
  const [savedGrades, setSavedGrades] = useState(null);

  // Load saved recommendations on mount and check if grades changed
  useEffect(() => {
    const loadSavedRecommendations = () => {
      try {
        const saved = localStorage.getItem('majorRecommendations');
        const savedGradesStr = localStorage.getItem('majorRecommendationGrades');
        
        if (saved && savedGradesStr) {
          const parsedSaved = JSON.parse(saved);
          const parsedGrades = JSON.parse(savedGradesStr);
          
          // Check if current grades match saved grades
          const currentGradesStr = JSON.stringify(userProfile?.grades || {});
          const savedGradesStr2 = JSON.stringify(parsedGrades);
          
          if (currentGradesStr === savedGradesStr2) {
            // Grades haven't changed, load saved recommendations
            setRecommendedMajors(parsedSaved);
            setSavedGrades(parsedGrades);
            setShowResults(true);
            console.log('✅ Loaded saved major recommendations');
          } else {
            // Grades have changed, clear recommendations
            localStorage.removeItem('majorRecommendations');
            localStorage.removeItem('majorRecommendationGrades');
            setRecommendedMajors([]);
            setSavedGrades(null);
            setShowResults(false);
            console.log('🔄 Grades changed, cleared saved recommendations');
          }
        }
      } catch (err) {
        console.error('Error loading saved recommendations:', err);
      }
    };

    loadSavedRecommendations();
  }, [userProfile?.grades]);

  // Fetch available majors from backend on mount
  useEffect(() => {
    const fetchMajorsFromBackend = async () => {
      try {
        const response = await API.get('/majors');
        setAvailableMajors(response.data.majors || response.data.data || []);
      } catch (err) {
        console.error('❌ Error fetching majors:', err);
        setAvailableMajors([]);
      } finally {
        setMajorsLoading(false);
      }
    };
    fetchMajorsFromBackend();
  }, []);

  const fetchMajorRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!userProfile?.grades || Object.keys(userProfile.grades).length === 0) {
        setError('Please enter your grades to get major recommendations');
        setLoading(false);
        return;
      }

      if (availableMajors.length === 0) {
        setError('No majors available from the database');
        setLoading(false);
        return;
      }

      // Use academicType as stream (science/social)
      const stream = userProfile.academicType || userProfile.stream || 'science';

      const result = await getCustomModelRecommendations(
        {
          stream,
          grades: userProfile.grades,
          gpa: userProfile.gpa || calculateGPA(userProfile.grades),
          strongSubjects: Object.keys(userProfile.grades).filter(
            subject => userProfile.grades[subject] === 'A' || userProfile.grades[subject] === 'B'
          )
        },
        availableMajors,
        5
      );

      // Sort by matchScore descending (model output) and take top 5
      const top5 = (result.recommendations || [])
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);

      setRecommendedMajors(top5);
      setSavedGrades(userProfile.grades);
      setShowResults(true);
      setLoading(false);

      // Save to localStorage
      try {
        localStorage.setItem('majorRecommendations', JSON.stringify(top5));
        localStorage.setItem('majorRecommendationGrades', JSON.stringify(userProfile.grades));
        console.log('💾 Saved major recommendations to localStorage');
      } catch (err) {
        console.error('Error saving to localStorage:', err);
      }
    } catch (err) {
      console.error('❌ Error fetching major recommendations:', err);
      setError(`Failed to get recommendations: ${err.message}`);
      setLoading(false);
    }
  };

  const calculateGPA = (grades) => {
    const gradePoints = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
    const values = Object.values(grades)
      .map(grade => gradePoints[grade] || 0)
      .filter(val => val > 0);
    return values.length > 0
      ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
      : 0;
  };

  const clearRecommendations = () => {
    setRecommendedMajors([]);
    setSavedGrades(null);
    setShowResults(false);
    setError(null);
    try {
      localStorage.removeItem('majorRecommendations');
      localStorage.removeItem('majorRecommendationGrades');
      console.log('🗑️ Cleared saved major recommendations');
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  };

  return (
    <div className="major-recommendations-section">
      <div className="recommendations-header">
        <h2 className="recommendations-title">🎓 AI-Powered Major Recommendations</h2>
        <p className="recommendations-subtitle">
          {showResults
            ? savedGrades ? '✅ Saved - Based on your grades and academic profile' : 'Based on your grades and academic profile'
            : 'Click below to get personalized major recommendations'}
        </p>
      </div>

      {!showResults && (
        <div className="recommend-button-container">
          <button
            className="recommend-button"
            onClick={fetchMajorRecommendations}
            disabled={loading || majorsLoading || !userProfile?.grades || Object.keys(userProfile.grades).length === 0}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Finding best majors...
              </>
            ) : majorsLoading ? (
              <>
                <span className="button-spinner"></span>
                Loading majors...
              </>
            ) : (
              '✨ Recommend Majors'
            )}
          </button>
          {(!userProfile?.grades || Object.keys(userProfile.grades).length === 0) && (
            <p className="help-text">Enter your grades first to get recommendations</p>
          )}
        </div>
      )}

      {showResults && recommendedMajors.length > 0 && (
        <div className="recommendation-status">
          <p className="status-text">💾 Recommendations saved - Update your grades to get new ones</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button
            className="retry-button"
            onClick={fetchMajorRecommendations}
          >
            Try Again
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <LoadingText text="Analyzing your grades and matching with majors using AI..." />
        </div>
      )}

      {showResults && recommendedMajors.length > 0 && (
        <div className="recommendations-list">
          {recommendedMajors.map((major, index) => (
            <div key={major.id || index} className={`recommendation-card rank-${index + 1}`}>
              <div className="rank-badge">{index + 1}</div>
              <div className="card-content">
                <h3 className="card-title">{major.title || major.name}</h3>
                <p className="card-subtitle">{major.description}</p>
              </div>
            </div>
          ))}

          <button
            className="refresh-button"
            onClick={clearRecommendations}
          >
            🗑️ Clear Recommendations
          </button>
        </div>
      )}

      {showResults && recommendedMajors.length === 0 && !loading && (
        <div className="empty-recommendations">
          <span className="empty-icon">🔍</span>
          <p>No major recommendations available. Try updating your grades.</p>
        </div>
      )}
    </div>
  );
};

export default MajorRecommendations;
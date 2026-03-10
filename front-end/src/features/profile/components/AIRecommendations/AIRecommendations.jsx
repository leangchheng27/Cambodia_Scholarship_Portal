import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getScholarshipRecommendations, calculateGPA } from '../../../../utils/scholarshipMatcher';
import { cambodiaScholarships } from '../../../../data/cambodiaScholarships';
import { abroadScholarships } from '../../../../data/abroadScholarships';
import './AIRecommendations.css';

const AIRecommendations = ({ userProfile }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showType, setShowType] = useState('all'); // 'all', 'cambodia', 'abroad'

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user has grades
        if (!userProfile.grades || Object.keys(userProfile.grades).length === 0) {
          setError('Please add your grades to get personalized recommendations');
          setLoading(false);
          return;
        }

        // Combine all scholarships
        const allScholarships = [...cambodiaScholarships, ...abroadScholarships];

        // Calculate GPA for user profile
        const gpa = calculateGPA(userProfile.grades);
        const enrichedProfile = {
          ...userProfile,
          gpa
        };

        // Get AI recommendations
        const aiRecommendations = getScholarshipRecommendations(enrichedProfile, allScholarships, 12);
        setRecommendations(aiRecommendations);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations. Please try again.');
        setLoading(false);
      }
    };

    if (userProfile) {
      fetchRecommendations();
    }
  }, [userProfile]);

  const filteredRecommendations = recommendations.filter(scholarship => {
    if (showType === 'all') return true;
    if (showType === 'cambodia') return cambodiaScholarships.some(s => s.id === scholarship.id);
    if (showType === 'abroad') return abroadScholarships.some(s => s.id === scholarship.id);
    return true;
  });

  const getBasePath = (scholarship) => {
    return cambodiaScholarships.some(s => s.id === scholarship.id) 
      ? '/scholarships/cambodia' 
      : '/scholarships/abroad';
  };

  const getMatchColor = (score) => {
    if (score >= 85) return '#10b981'; // green
    if (score >= 70) return '#3b82f6'; // blue
    if (score >= 55) return '#f59e0b'; // orange
    return '#6b7280'; // gray
  };

  if (loading) {
    return (
      <div className="ai-recommendations-section">
        <div className="recommendations-header">
          <h2 className="recommendations-title">AI Scholarship Recommendations</h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Analyzing your profile and finding best matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-recommendations-section">
        <div className="recommendations-header">
          <h2 className="recommendations-title"> AI Scholarship Recommendations</h2>
        </div>
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="ai-recommendations-section">
        <div className="recommendations-header">
          <h2 className="recommendations-title">Scholarship Recommendations</h2>
        </div>
        <div className="empty-recommendations">
          <span className="empty-icon">🔍</span>
          <p>No scholarships found matching your profile. Try updating your grades.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-recommendations-section">
      <div className="recommendations-header">
        <div>
          <h2 className="recommendations-title">AI Scholarship Recommendations</h2>
          <p className="recommendations-subtitle">
            Found {recommendations.length} scholarships perfectly matched to your academic profile
          </p>
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${showType === 'all' ? 'active' : ''}`}
            onClick={() => setShowType('all')}
          >
            All ({recommendations.length})
          </button>
          <button 
            className={`filter-btn ${showType === 'cambodia' ? 'active' : ''}`}
            onClick={() => setShowType('cambodia')}
          >
            Cambodia ({recommendations.filter(s => cambodiaScholarships.some(cs => cs.id === s.id)).length})
          </button>
          <button 
            className={`filter-btn ${showType === 'abroad' ? 'active' : ''}`}
            onClick={() => setShowType('abroad')}
          >
            Abroad ({recommendations.filter(s => abroadScholarships.some(as => as.id === s.id)).length})
          </button>
        </div>
      </div>

      <div className="recommendations-grid">
        {filteredRecommendations.map((scholarship) => (
          <div key={scholarship.id} className="recommendation-card">
            <div className="card-image-container">
              <img 
                src={scholarship.image} 
                alt={scholarship.title} 
                className="card-image"
              />
              <div 
                className="match-badge"
                style={{ backgroundColor: getMatchColor(scholarship.matchScore) }}
              >
                {scholarship.matchScore}% Match
              </div>
            </div>

            <div className="card-body">
              <h3 className="card-title">{scholarship.title}</h3>
              <p className="card-description">{scholarship.description}</p>

              <div className="match-reasons">
                {scholarship.matchReasons?.slice(0, 3).map((reason, index) => (
                  <div key={index} className="reason-tag">
                    {reason}
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <Link 
                  to={`${getBasePath(scholarship)}/detail/${scholarship.id}`}
                  className="view-details-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;

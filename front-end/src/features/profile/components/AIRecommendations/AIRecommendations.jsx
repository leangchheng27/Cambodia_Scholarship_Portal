import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAIRecommendations } from '../../../../utils/profileUtils';
import { getScholarships } from '../../../../api/scholarshipApi';
import LoadingText from '../../../../components/ui/LoadingText/LoadingText.jsx';
import './AIRecommendations.css';

const AIRecommendations = ({ userProfile }) => {
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('cambodia'); // 'cambodia' or 'abroad'

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user has grades
      if (!userProfile.grades || Object.keys(userProfile.grades).length === 0) {
        setRecommendedScholarships([]);
        setLoading(false);
        return;
      }

      // Fetch all scholarships from API
      let scholarshipsFromAPI = await getScholarships();

      // Build enriched profile (same as scholarship list pages)
      const enrichedProfile = {
        ...userProfile,
        studentType: userProfile.studentType || userProfile.academicType,
      };

      // Fetch recommendations separately for Cambodia and Abroad (same as scholarship list pages)
      // This ensures we get the same AI matching results as the individual pages
      const cambodiaScholarships = scholarshipsFromAPI.filter(s => s.type === 'cambodia' || !s.type);
      const abroadScholarships = scholarshipsFromAPI.filter(s => s.type === 'abroad');

      // Get recommendations for each region (same limit as scholarship list pages)
      const cambodiaRecommendations = await getAIRecommendations(
        enrichedProfile,
        cambodiaScholarships,
        cambodiaScholarships.length
      );

      const abroadRecommendations = await getAIRecommendations(
        enrichedProfile,
        abroadScholarships,
        abroadScholarships.length
      );

      // Combine and add category to all recommendations
      const allRecommendations = [
        ...cambodiaRecommendations.map(s => ({
          ...s,
          category: 'cambodia'
        })),
        ...abroadRecommendations.map(s => ({
          ...s,
          category: 'abroad'
        }))
      ];

      console.log('Received Cambodia:', cambodiaRecommendations.length, 'Abroad:', abroadRecommendations.length);

      setRecommendedScholarships(allRecommendations);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to load recommendations. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userProfile) {
      fetchRecommendations();
    }
  }, [userProfile]);

  // Filter recommended scholarships by type (ONLY show filtered results, not all data)
  const filteredRecommendations = recommendedScholarships.filter(scholarship => {
    return filterType === 'cambodia' 
      ? scholarship.category === 'cambodia'
      : scholarship.category === 'abroad';
  });

  const recommendationsAvailable = userProfile?.grades && Object.keys(userProfile.grades).length > 0;

  const getBasePath = (scholarship) => {
    return scholarship.category === 'cambodia' 
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
          <h2 className="recommendations-title">Recommended Scholarships</h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <LoadingText text="Analyzing your profile and finding best matches..." />
        </div>
      </div>
    );
  }

  if (!recommendationsAvailable) {
    return (
      <div className="ai-recommendations-section">
        <div className="recommendations-header">
          <h2 className="recommendations-title">Recommended Scholarships</h2>
        </div>
        <div className="empty-recommendations">
          <span className="empty-icon">📚</span>
          <p>Add your grades to get personalized scholarship recommendations</p>
        </div>
      </div>
    );
  }

  if (recommendedScholarships.length === 0) {
    return (
      <div className="ai-recommendations-section">
        <div className="recommendations-header">
          <h2 className="recommendations-title">Recommended Scholarships</h2>
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
        <div className="header-top">
          <h2 className="recommendations-title">Recommended Scholarships</h2>
          <p className="recommendations-subtitle">
            Top scholarships matched to your academic profile
          </p>
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterType === 'cambodia' ? 'active' : ''}`}
            onClick={() => setFilterType('cambodia')}
          >
            Cambodia ({recommendedScholarships.filter(s => s.category === 'cambodia').length})
          </button>
          <button 
            className={`filter-btn ${filterType === 'abroad' ? 'active' : ''}`}
            onClick={() => setFilterType('abroad')}
          >
            Abroad ({recommendedScholarships.filter(s => s.category === 'abroad').length})
          </button>
        </div>
      </div>

      <div className="recommendations-grid">
        {filteredRecommendations.slice(0, 6).map((scholarship) => {
          const recommendationKey = `${scholarship.category || 'unknown'}-${scholarship.id}`;

          return (
          <div key={recommendationKey} className="recommendation-card">
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
        )})}
      </div>

      {filteredRecommendations.length > 6 && (
        <div className="view-more-section">
          <Link to="/home" className="view-more-btn">
            View More Recommendations
          </Link>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;

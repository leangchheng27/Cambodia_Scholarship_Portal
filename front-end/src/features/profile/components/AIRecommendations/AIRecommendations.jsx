import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAIRecommendations } from '../../../../utils/profileUtils';
import { getScholarships } from '../../../../api/scholarshipApi';
import { getInternships } from '../../../../api/internshipApi';
import LoadingText from '../../../../components/ui/LoadingText/LoadingText.jsx';
import './AIRecommendations.css';

const AIRecommendations = ({ userProfile }) => {
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('cambodia'); // 'cambodia', 'abroad', or 'internship'
  const [viewMode, setViewMode] = useState('scholarships'); // 'scholarships' or 'internships'

  // Check if user is college/university student
  const isUniversityStudent = userProfile?.studentType === 'college' || userProfile?.studentType === 'graduate';
  const isHighSchoolStudent = userProfile?.studentType === 'highschool' || userProfile?.academicType;

  const fetchRecommendations = async () => {
    try {
      // Clear existing recommendations when fetching new ones
      setRecommendedScholarships([]);
      setRecommendedInternships([]);
      setLoading(true);
      setError(null);

      // Build enriched profile (same as scholarship list pages)
      const enrichedProfile = {
        ...userProfile,
        studentType: userProfile.studentType || userProfile.academicType,
      };

      console.log('🔍 AIRecommendations - Enriched Profile:', enrichedProfile);
      console.log('🔍 AIRecommendations - Grades object:', enrichedProfile.grades);
      console.log('🔍 AIRecommendations - Grades keys:', enrichedProfile.grades ? Object.keys(enrichedProfile.grades) : 'NO GRADES');
      console.log('🔍 AIRecommendations - Non-empty grades:', enrichedProfile.grades ? Object.entries(enrichedProfile.grades).filter(([_, g]) => g) : []);

      // For HIGH SCHOOL STUDENTS: Fetch scholarship recommendations
      if (isHighSchoolStudent && userProfile?.grades && Object.keys(userProfile.grades).length > 0) {
        const scholarshipsFromAPI = await getScholarships();

        // Fetch recommendations separately for Cambodia and Abroad
        const cambodiaScholarships = scholarshipsFromAPI.filter(s => s.type === 'cambodia' || !s.type);
        const abroadScholarships = scholarshipsFromAPI.filter(s => s.type === 'abroad');

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
      }

      // For COLLEGE/GRADUATE STUDENTS: Fetch internship recommendations
      if (isUniversityStudent && userProfile?.universityField) {
        const internshipsFromAPI = await getInternships();

        const internshipRecommendations = await getAIRecommendations(
          enrichedProfile,
          internshipsFromAPI,
          internshipsFromAPI.length
        );

        console.log('Received Internships:', internshipRecommendations.length);
        setRecommendedInternships(internshipRecommendations);
      }

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
  }, [userProfile?.grades, userProfile?.universityField, userProfile?.studentType, userProfile?.academicType]);

  // Filter recommendations based on view mode
  const filteredRecommendations = viewMode === 'scholarships'
    ? recommendedScholarships.filter(scholarship => {
        return filterType === 'cambodia' 
          ? scholarship.category === 'cambodia'
          : scholarship.category === 'abroad';
      })
    : recommendedInternships;

  const scholarshipsAvailable = isHighSchoolStudent && userProfile?.grades && Object.keys(userProfile.grades).length > 0;
  const internshipsAvailable = isUniversityStudent && userProfile?.universityField;

  const getBasePath = (item) => {
    if (viewMode === 'internships') {
      return '/scholarships/internship';
    }
    return item.category === 'cambodia' 
      ? '/scholarships/cambodia' 
      : '/scholarships/abroad';
  };

  const getMatchColor = (score) => {
    return '#718096';
  };

  const renderStarRating = (score) => {
    if (!score) return '★';
    
    // Handle case where score might still be 0-100, convert to 1-5
    let normalizedScore = score;
    if (score > 5) {
      normalizedScore = Math.max(1, (score / 100) * 5);
    }
    
    // Round to nearest whole number for full stars only
    const fullStars = Math.min(5, Math.max(1, Math.round(normalizedScore)));
    
    // Display only filled stars (★★★ not ★★★☆☆)
    return '★'.repeat(fullStars);
  };

  if (loading) {
    return (
      <div className="ai-recommendations-section">
        <div className="recommendations-header">
          <h2 className="recommendations-title">
            {viewMode === 'scholarships' ? 'Recommended Scholarships' : 'Recommended Internships'}
          </h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <LoadingText text="Analyzing your profile and finding best matches..." />
        </div>
      </div>
    );
  }

  // Show nothing if no recommendations available for either type
  if (!scholarshipsAvailable && !internshipsAvailable) {
    return null;
  }

  // If only one type available, lock to that view mode
  let displayViewMode = viewMode;
  if (scholarshipsAvailable && !internshipsAvailable) {
    displayViewMode = 'scholarships';
  } else if (!scholarshipsAvailable && internshipsAvailable) {
    displayViewMode = 'internships';
  }

  // Filter for current view mode
  const currentRecommendations = displayViewMode === 'scholarships'
    ? recommendedScholarships.filter(scholarship => {
        return filterType === 'cambodia' 
          ? scholarship.category === 'cambodia'
          : scholarship.category === 'abroad';
      })
    : recommendedInternships;

  if (currentRecommendations.length === 0) {
    const typeLabel = displayViewMode === 'scholarships' 
      ? 'scholarships' 
      : 'internships';
    return (
      <div className="ai-recommendations-section">
        <div className="recommendations-header">
          <h2 className="recommendations-title">
            {displayViewMode === 'scholarships' ? 'Recommended Scholarships' : 'Recommended Internships'}
          </h2>
        </div>
        <div className="empty-recommendations">
          <span className="empty-icon">🔍</span>
          <p>No {typeLabel} found matching your profile. Try updating your information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-recommendations-section">
      <div className="recommendations-header">
        <div className="header-top">
          <h2 className="recommendations-title">
            {displayViewMode === 'scholarships' ? 'Recommended Scholarships' : 'Recommended Internships'}
          </h2>
          <p className="recommendations-subtitle">
            {displayViewMode === 'scholarships'
              ? 'Top scholarships matched to your academic profile'
              : 'Top internships matched to your field of study'}
          </p>
        </div>
        
        {/* Show view mode tabs if both are available */}
        {scholarshipsAvailable && internshipsAvailable && (
          <div className="view-mode-tabs">
            <button 
              className={`mode-tab ${displayViewMode === 'scholarships' ? 'active' : ''}`}
              onClick={() => setViewMode('scholarships')}
            >
              📚 Scholarships ({recommendedScholarships.length})
            </button>
            <button 
              className={`mode-tab ${displayViewMode === 'internships' ? 'active' : ''}`}
              onClick={() => setViewMode('internships')}
            >
              💼 Internships ({recommendedInternships.length})
            </button>
          </div>
        )}

        {/* Show region filters only for scholarships */}
        {displayViewMode === 'scholarships' && (
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
        )}
      </div>

      <div className="recommendations-grid">
        {currentRecommendations.slice(0, 6).map((item) => {
          const itemKey = displayViewMode === 'scholarships'
            ? `${item.category || 'unknown'}-${item.id}`
            : `internship-${item.id}`;

          return (
            <div key={itemKey} className="recommendation-card">
              <div className="card-image-container">
                <img 
                  src={item.image || item.poster_image_url} 
                  alt={item.title || item.name} 
                  className="card-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=' + (item.title || item.name);
                  }}
                />
                <div 
                  className="match-badge"
                  style={{ 
                    backgroundColor: getMatchColor(item.matchScore),
                    color: '#FFC107'
                  }}
                >
                  {renderStarRating(item.matchScore)}
                </div>
              </div>

              <div className="card-body">
                <h3 className="card-title">{item.title || item.name}</h3>
                <p className="card-description">{item.description}</p>

                <div className="match-reasons">
                  {item.matchReasons?.slice(0, 3).map((reason, index) => (
                    <div key={index} className="reason-tag">
                      {reason}
                    </div>
                  ))}
                </div>

                <div className="card-footer">
                  <Link 
                    to={`${getBasePath(item)}/detail/${item.id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentRecommendations.length > 6 && (
        <div className="view-more-section">
          <Link 
            to={displayViewMode === 'scholarships' ? '/home' : '/scholarships/internship'} 
            className="view-more-btn"
          >
            View More {displayViewMode === 'scholarships' ? 'Scholarships' : 'Internships'}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;

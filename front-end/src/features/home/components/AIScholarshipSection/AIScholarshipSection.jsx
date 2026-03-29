import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateGPA } from '../../../../utils/profileUtils';
import { getScholarships } from '../../../../api/scholarshipApi';
import LoadingText from '../../../../components/ui/LoadingText/LoadingText.jsx';
import './AIScholarshipSection.css';

const AIScholarshipSection = ({ title, subtitle, userProfile, type = 'all', limit = 6, linkTo }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      console.log(`AIScholarshipSection [${type}] - userProfile:`, userProfile);
      
      setIsLoading(true);
      try {
        // Fetch scholarships from API
        let scholarshipList = await getScholarships();

        // Filter by type if specified
        if (type === 'cambodia') {
          scholarshipList = scholarshipList.slice(0, Math.ceil(scholarshipList.length / 2));
        } else if (type === 'abroad') {
          scholarshipList = scholarshipList.slice(Math.ceil(scholarshipList.length / 2));
        }

        // Show default scholarships (no AI matching on home page)
        console.log(`AIScholarshipSection [${type}] - Showing ${limit} scholarships`);
        setRecommendations(scholarshipList.slice(0, limit));
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [userProfile, type, limit]);

  const handleCardClick = (scholarship) => {
    navigate(`/scholarships/${type}/detail/${scholarship.id}`);
  };

  const getMatchColor = (score) => {
    // Gray background for all star ratings
    return '#718096';
  };

  const renderStars = (score) => {
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

  return (
    <section className="scholarship-section">
      {/* Title Section */}
      <div className="section-header">
        <div className="section-header-container">
          <h1 className="section-main-title">{title}</h1>
          <p className="section-subtitle-header">
            {userProfile?.grades && Object.keys(userProfile.grades).length > 0 
              ? 'Scholarships that best match your academic profile and interests' 
              : subtitle}
          </p>
        </div>
      </div>

      <div className="section-container">
        
        {isLoading ? (
          <div className="scholarship-grid">
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <LoadingText text="Loading recommendations..." />
            </div>
          </div>
        ) : (
          <div className="scholarship-grid">
            {recommendations.map((scholarship) => (
              <div 
                key={scholarship.id} 
                className="scholarship-card-home"
                onClick={() => handleCardClick(scholarship)}
              >
                <div className="scholarship-card-image-wrapper">
                  <img 
                    src={scholarship.image} 
                    alt={scholarship.title} 
                    className="scholarship-card-image" 
                  />
                  {scholarship.matchScore && (
                    <div 
                      className="match-badge-overlay"
                      style={{ 
                        backgroundColor: getMatchColor(scholarship.matchScore),
                        color: '#FFC107'
                      }}
                    >
                      {renderStars(scholarship.matchScore)}
                    </div>
                  )}
                </div>
                <div className="scholarship-card-content-home">
                  <h3 className="scholarship-card-title-home">{scholarship.title}</h3>
                  <p className="scholarship-card-description-home">{scholarship.description}</p>
                  <button className="view-detail-btn-home">View more detail</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Link to={linkTo} className="view-more-btn">View More &gt;</Link>
      </div>
    </section>
  );
};

export default AIScholarshipSection;

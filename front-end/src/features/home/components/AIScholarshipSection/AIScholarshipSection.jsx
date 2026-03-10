import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAIRecommendations, calculateGPA } from '../../../../backend';
import { cambodiaScholarships } from '../../../../data/cambodiaScholarships';
import { abroadScholarships } from '../../../../data/abroadScholarships';
import './AIScholarshipSection.css';

const AIScholarshipSection = ({ title, subtitle, userProfile, type = 'all', limit = 6, linkTo }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        // Prepare scholarship list based on type
        let scholarshipList;
        if (type === 'cambodia') {
          scholarshipList = cambodiaScholarships;
        } else if (type === 'abroad') {
          scholarshipList = abroadScholarships;
        } else {
          scholarshipList = [...cambodiaScholarships, ...abroadScholarships];
        }

        // If user has grades, get AI recommendations (sorted by match score)
        if (userProfile?.grades && Object.keys(userProfile.grades).length > 0) {
          const gpa = calculateGPA(userProfile.grades);
          const enrichedProfile = {
            ...userProfile,
            gpa
          };

          const aiRecommendations = await getAIRecommendations(enrichedProfile, scholarshipList, limit);
          console.log(`AIScholarshipSection [${type}] - Received ${aiRecommendations.length} recommendations`);
          aiRecommendations.forEach((s, i) => {
            console.log(`  ${i + 1}. ${s.title} - ${s.matchScore}%`);
          });
          setRecommendations(aiRecommendations);
        } else {
          // Show default scholarships for users without profile
          console.log(`AIScholarshipSection [${type}] - No user profile, showing default scholarships`);
          setRecommendations(scholarshipList.slice(0, limit));
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Fallback to showing top scholarships
        const scholarshipList = type === 'cambodia' ? cambodiaScholarships : 
                               type === 'abroad' ? abroadScholarships : 
                               [...cambodiaScholarships, ...abroadScholarships];
        setRecommendations(scholarshipList.slice(0, limit));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [userProfile, type, limit]);

  const handleCardClick = (scholarship) => {
    const basePath = cambodiaScholarships.some(s => s.id === scholarship.id) 
      ? '/scholarships/cambodia' 
      : '/scholarships/abroad';
    navigate(`${basePath}/detail/${scholarship.id}`);
  };

  const getMatchColor = (score) => {
    if (!score) return '#6b7280';
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 55) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <section className="scholarship-section">
      {/* Title Section */}
      <div className="section-header">
        <div className="section-header-container">
          <h1 className="section-main-title">{title}</h1>
        </div>
      </div>

      <div className="section-container">
        <p className="section-subtitle">
          {userProfile?.grades && Object.keys(userProfile.grades).length > 0 
            ? 'Scholarships that best match your academic profile and interests' 
            : subtitle}
        </p>
        
        {isLoading ? (
          <div className="scholarship-grid">
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              Loading recommendations...
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
                      style={{ backgroundColor: getMatchColor(scholarship.matchScore) }}
                    >
                      {scholarship.matchScore}%
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

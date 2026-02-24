import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ScholarshipSection.css';

const ScholarshipSection = ({ 
  title, 
  subtitle, 
  items, 
  linkTo, 
  type = 'scholarship',
  bannerImage 
}) => {
  const isInternship = type === 'internship';
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    const detailPath = `${linkTo}/detail/${index + 1}/overview`;
    navigate(detailPath);
  };

  return (
    <section className={`${type}-section`}>
      {/* Banner Image */}
      {bannerImage && (
        <div className="section-hero-banner">
          <img src={bannerImage} alt={`${title} Banner`} className="section-banner-image" />
        </div>
      )}

      {/* Title Section */}
      <div className="section-header">
        <div className="section-header-container">
          <h1 className="section-main-title">{title}</h1>
        </div>
      </div>

      <div className="section-container">
        <p className="section-subtitle">{subtitle}</p>
        
        <div className={isInternship ? 'internship-grid' : 'scholarship-grid'}>
          {items.map((image, index) => (
            <div 
              key={index} 
              className={isInternship ? 'internship-card' : 'scholarship-card'}
              onClick={() => !isInternship && handleCardClick(index)}
              style={!isInternship ? { cursor: 'pointer' } : {}}
            >
              <img 
                src={image} 
                alt={`${title} ${index + 1}`} 
                className={isInternship ? 'company-logo' : 'card-image'} 
              />
              {!isInternship && (
                <>
                  <h3 className="card-title">កម្មវិធីអាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមសិក្សា</h3>
                  <p className="card-description">សូមស្វាគមន៍មកកាន់កម្មវិធីអាហារូបករណ៍</p>
                  <button className="view-detail-btn">View more detail</button>
                </>
              )}
            </div>
          ))}
        </div>
        
        <Link to={linkTo} className="view-more-btn">View More &gt;</Link>
      </div>
    </section>
  );
};

export default ScholarshipSection;


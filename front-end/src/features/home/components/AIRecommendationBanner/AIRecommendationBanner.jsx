import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext.jsx';
import './AIRecommendationBanner.css';
import logo from '../../../../assets/Header/logo.png';

const AIRecommendationBanner = () => {
  const { user, profile } = useAuth();
  
  // Check if user has completed grades
  const hasGrades = profile?.grades && Object.keys(profile.grades).length > 0;
  
  if (!user) {
    return (
      <section className="ai-recommendation-banner">
        <div className="ai-banner-content">
          <div className="ai-banner-left">
            <div className="ai-banner-icon">
              <img src={logo} alt="AI Recommendations" />
            </div>
            <div className="ai-banner-text">
              <h2>Unlock AI-Powered Recommendations</h2>
              <p>Create your profile and add your grades to get personalized scholarship and internship recommendations based on your fit.</p>
            </div>
          </div>
          <Link to="/signup" className="ai-banner-cta">
            Create Account
          </Link>
        </div>
      </section>
    );
  }

  if (hasGrades) {
    return (
      <section className="ai-recommendation-banner ai-recommendation-banner--active">
        <div className="ai-banner-content">
          <div className="ai-banner-left">
            <div className="ai-banner-icon">
              <img src={logo} alt="AI Recommendations" />
            </div>
            <div className="ai-banner-text">
              <h2>Your AI Recommendations Are Ready</h2>
              <p>Based on your profile and grades, you now have personalized scholarship and internship recommendations.</p>
            </div>
          </div>
          <Link to="/scholarships/cambodia" className="ai-banner-cta ai-banner-cta--active">
            View Recommendations
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-recommendation-banner ai-recommendation-banner--pending">
      <div className="ai-banner-content">
        <div className="ai-banner-left">
          <div className="ai-banner-icon">
            <img src={logo} alt="AI Recommendations" />
          </div>
          <div className="ai-banner-text">
            <h2>Complete Your Profile for AI Recommendations</h2>
            <p>Add your grades and academic information to unlock personalized scholarship recommendations powered by AI.</p>
          </div>
        </div>
        <Link to="/profile" className="ai-banner-cta ai-banner-cta--pending">
          Complete Profile
        </Link>
      </div>
    </section>
  );
};

export default AIRecommendationBanner;

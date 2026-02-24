import React from 'react';
import Navbar from '../../layout/Header/Navbar';
import Footer from '../../layout/Footer/Footer';
import './AboutPage.css';
import teamPhoto from '../../assets/about/about.png';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <Navbar />

      

      {/* WHO WE ARE Section */}
      <section className="who-we-are-section">
        <div className="container">
          <h1 className="section-main-title">WHO WE ARE</h1>
          <div className="team-photo-container">
            <img src={teamPhoto} alt="CSP Team" className="team-photo" />
          </div>
          <p className="team-description">
            We are third-year Computer Science students specializing in Software Engineering at CADT, passionate about
            creating practical and innovative software solutions.
          </p>
        </div>
      </section>

      {/* About CSP Section */}
      <section className="about-csp-section">
        <div className="container">
          <h2 className="section-heading">About Cambodia Scholarship Portal (CSP)</h2>
          <p className="about-description">
            CSP is a digital platform designed to help Cambodian students easily discover, explore, and access scholarship opportunities both locally and
            internationally. Our goal is to simplify the scholarship search process and make educational opportunities more accessible for everyone.
          </p>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="what-we-provide-section">
        <div className="container">
          <h2 className="section-heading">What We Provide</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Up-to-date scholarship listings</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Clear eligibility and application details</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Easy-to-navigate user interface</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">A platform designed for students, by students</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="our-vision-section">
        <div className="container">
          <h2 className="section-heading">Our Vision</h2>
          <p className="vision-description">
            A future where every Cambodian student can access the right scholarship without barriers.
          </p>
        </div>
      </section>

      {/* Features & Bottom Section */}
      <section className="bottom-features-section">
        <div className="container">
          <div className="bottom-content">
            <div className="why-choose-csp">
              <h3 className="bottom-heading">Why choose CSP?</h3>
              <p className="bottom-text">
                Find. Apply. Succeed. Discover scholarships quickly with <span className="highlight">CSP</span> verified programs and
                personalized tools.
              </p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-card-icon">⚡</div>
                <h4 className="feature-card-title">Fast Application</h4>
                <p className="feature-card-text">Apply for scholarship quickly without hassle</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-card-icon">✓</div>
                <h4 className="feature-card-title">Verified Programs</h4>
                <p className="feature-card-text">All scholarships are checked and up-to-date</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-card-icon">👤</div>
                <h4 className="feature-card-title">Personalized Matches</h4>
                <p className="feature-card-text">Find scholarships that fit your profile</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-card-icon">📍</div>
                <h4 className="feature-card-title">Helpful Resources</h4>
                <p className="feature-card-text">Access guide and tips to improve your applications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;

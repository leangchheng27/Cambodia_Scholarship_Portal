import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/logo.png" alt="Cambodia Scholarship Portal" className="header-logo" />
            <span className="portal-name">CAMBODIA SCHOLARSHIP PORTAL</span>
          </div>
          
          <nav className="nav-menu">
            <Link to="/about">About</Link>
            <Link to="/scholarship">Scholarship</Link>
            <Link to="/university">University</Link>
            <Link to="/internship">Internship</Link>
          </nav>
          
          <div className="header-actions">
            <button className="search-btn">🔍</button>
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <img src="/hero-banner.png" alt="Digital Scholarship" className="hero-image" />
        </div>
      </section>

      {/* Cambodia Scholarship Section */}
      <section className="scholarship-section">
        <div className="section-container">
          <h2 className="section-title">Cambodia Scholarship</h2>
          <p className="section-subtitle">Here are some of the best college scholarships with approaching deadlines.</p>
          
          <div className="scholarship-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="scholarship-card">
                <img src={`/scholarship-${item}.png`} alt={`Scholarship ${item}`} className="card-image" />
                <h3 className="card-title">កម្មវិធីអាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមសិក្សា</h3>
                <p className="card-description">សូមស្វាគមន៍មកកាន់កម្មវិធីអាហារូបករណ៍</p>
                <button className="view-detail-btn">View more detail →</button>
              </div>
            ))}
          </div>
          
          <button className="view-more-btn">View More &gt;</button>
        </div>
      </section>

      {/* International Program Section */}
      <section className="international-section">
        <div className="section-container">
          <h2 className="section-title">International Program</h2>
          <p className="section-subtitle">Here are some of the best college scholarships with approaching deadlines.</p>
          
          <div className="scholarship-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="scholarship-card">
                <img src={`/international-${item}.png`} alt={`International Program ${item}`} className="card-image" />
                <h3 className="card-title">កម្មវិធីអាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមសិក្សា</h3>
                <p className="card-description">សូមស្វាគមន៍មកកាន់កម្មវិធីអាហារូបករណ៍</p>
                <button className="view-detail-btn">View more detail →</button>
              </div>
            ))}
          </div>
          
          <button className="view-more-btn">View More &gt;</button>
        </div>
      </section>

      {/* Internship Section */}
      <section className="internship-section">
        <div className="section-container">
          <h2 className="section-title">Internship</h2>
          <p className="section-subtitle">Here are some of the best college scholarships with approaching deadlines.</p>
          
          <div className="internship-grid">
            <div className="internship-card">
              <img src="/company-1.png" alt="Company 1" className="company-logo" />
            </div>
            <div className="internship-card">
              <img src="/company-2.png" alt="TotalEnergies" className="company-logo" />
            </div>
            <div className="internship-card">
              <img src="/company-3.png" alt="Wing Bank" className="company-logo" />
            </div>
          </div>
          
          <button className="view-more-btn">View More &gt;</button>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="section-container">
          <img src="/cambodia-map.png" alt="Cambodia Map" className="cambodia-map" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Why choose CSP?</h3>
            <p>Connect with top universities and funding programs, discover opportunities, and apply quickly with expert-curated, verified programs and resources.</p>
          </div>
          
          <div className="footer-column">
            <h3>Features</h3>
            <div className="feature-grid">
              <div className="feature-item">
                <span className="feature-icon">📝</span>
                <h4>Application</h4>
                <p>Apply for top universities and scholarships without hassle.</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📚</span>
                <h4>Programs</h4>
                <p>All scholarship program and resources in one site.</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎓</span>
                <h4>Admissions</h4>
                <p>Easily find information for admission opportunities.</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📖</span>
                <h4>Resources</h4>
                <p>Access tips and detail for better application.</p>
              </div>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Link</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Term & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Advertise</h3>
            <Link to="/advertise">Advertise With Us</Link>
          </div>
          
          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><Link to="/story">Our Story</Link></li>
              <li><Link to="/team">Our Team</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact</h3>
            <p>Cell: +855 843 878</p>
            <p>Phnom Penh, Cambodia</p>
          </div>
          
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📷</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Cambodia Scholarship Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

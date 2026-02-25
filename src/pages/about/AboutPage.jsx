import React from 'react';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import AboutLayout from '../../features/about/Layout/AboutLayout.jsx';
import FeatureCard from '../../features/about/components/FeatureCard/FeatureCard.jsx';
import teamPhoto from '../../assets/about/about.png';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutLayout>
        {/* Who We Are Section */}
        <section className="about-section who-we-are">
          <h2>WHO WE ARE</h2>
          <div className="team-photo">
            <img src={teamPhoto} alt="Our Team" />
          </div>
          <p>
            We are dedicated to helping Cambodian students discover and access scholarship opportunities
            both locally and internationally. Our platform is designed to simplify the scholarship search
            process and make educational opportunities more accessible for everyone.
          </p>
        </section>

        {/* What We Provide Section */}
        <section className="about-section what-we-provide">
          <h2>What We Provide</h2>
          <div className="features-grid-about">
            <FeatureCard
              icon="✓"
              title="Up-to-date Listings"
              description="Access the latest scholarship opportunities with regularly updated information"
            />
            <FeatureCard
              icon="📋"
              title="Clear Details"
              description="Find clear eligibility criteria and application requirements for each scholarship"
            />
            <FeatureCard
              icon="🔍"
              title="Easy Search"
              description="Navigate through our user-friendly interface to find the perfect scholarship"
            />
            <FeatureCard
              icon="🎓"
              title="Student Focused"
              description="A platform designed for students, by students who understand your needs"
            />
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="about-section our-vision">
          <h2>Our Vision</h2>
          <p>
            A future where every Cambodian student can access the right scholarship without barriers.
            We believe education is the key to personal and national development.
          </p>
        </section>

        {/* Why Choose CSP Section */}
        <section className="about-section why-choose">
          <h2>Why Choose CSP?</h2>
          <p className="why-choose-intro">
            Find. Apply. Succeed. Discover scholarships quickly with verified programs and personalized tools.
          </p>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <span className="why-icon">⚡</span>
              <div>
                <h4>Fast Access</h4>
                <p>Quick and easy access to scholarship information</p>
              </div>
            </div>
            <div className="why-choose-item">
              <span className="why-icon">✓</span>
              <div>
                <h4>Verified Programs</h4>
                <p>All scholarships are checked and verified</p>
              </div>
            </div>
            <div className="why-choose-item">
              <span className="why-icon">🎯</span>
              <div>
                <h4>Personalized Search</h4>
                <p>Find scholarships that match your profile</p>
              </div>
            </div>
          </div>
        </section>
      </AboutLayout>
      <Footer />
    </>
  );
}

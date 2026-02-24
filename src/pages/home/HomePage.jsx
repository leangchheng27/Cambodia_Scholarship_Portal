import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../layout/Header/Navbar';
import Footer from '../../layout/Footer/Footer';
import HeroBanner from '../../layout/Slide/HeroBanner';
import ScholarshipSection from '../../components/ScholarshipSection/ScholarshipSection';
import './home.css';

// Import Cambodia scholarship images
import cambodia1 from '../../assets/cambodia/1.jpg';
import cambodia2 from '../../assets/cambodia/2.png';
import cambodia3 from '../../assets/cambodia/3.png';
import cambodia4 from '../../assets/cambodia/4.png';
import cambodia5 from '../../assets/cambodia/5.png';
import cambodia6 from '../../assets/cambodia/6.png';

//Import Abroad/International program images
import abroad1 from '../../assets/abroad/1.png';
import abroad2 from '../../assets/abroad/2.png';
import abroad3 from '../../assets/abroad/3.png';

// Import Internship images
import internship1 from '../../assets/internship/1.png';
import internship2 from '../../assets/internship/2.png';
import internship3 from '../../assets/internship/3.png';

import map from '../../assets/map.png';

const HomePage = () => {
  const cambodiaScholarships = [cambodia1, cambodia2, cambodia3, cambodia4, cambodia5, cambodia6];
  const abroadPrograms = [abroad1, abroad2, abroad3];
  const internships = [internship1, internship2, internship3];

  return (
    <div className="home-page">
      {/* Header */}
      <Navbar />

      {/* Hero Banner - Auto-slides every 5 seconds */}
      <HeroBanner />

      {/* Cambodia Scholarship Section */}
      <ScholarshipSection
        title="Cambodia Scholarship"
        subtitle="Here are some of the best college scholarships with approaching deadlines."
        items={cambodiaScholarships}
        linkTo="/cambodia"
        type="scholarship"
      />

      {/* International Program Section */}
      <ScholarshipSection
        title="International Program"
        subtitle="Here are some of the best college scholarships with approaching deadlines."
        items={abroadPrograms}
        linkTo="/abroad"
        type="international"
      />

      {/* Internship Section */}
      <ScholarshipSection
        title="Internship"
        subtitle="Here are some of the best college scholarships with approaching deadlines."
        items={internships}
        linkTo="/internship"
        type="internship"
      />

      {/* Map Section */}
      <section className="map-section">
        <div className="section-container">
          <img src={map} alt="Cambodia Map" className="cambodia-map" />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
import React from 'react';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import HeroBanner from '../../features/home/components/HeroBanner/HeroBanner.jsx';
import ScholarshipSection from '../../features/home/components/ScholarshipSection/ScholarshipSection.jsx';
import './HomePage.css';

// Import banner images
import banner1 from '../../assets/banner/p1.png';
import banner2 from '../../assets/banner/p2.jpg';
import banner3 from '../../assets/banner/p3.png';
import banner4 from '../../assets/banner/p4.png';
import banner5 from '../../assets/banner/p5.png';

// Import Cambodia scholarship images
import cambodia1 from '../../assets/cambodia/1.jpg';
import cambodia2 from '../../assets/cambodia/2.png';
import cambodia3 from '../../assets/cambodia/3.png';
import cambodia4 from '../../assets/cambodia/4.png';
import cambodia5 from '../../assets/cambodia/5.png';
import cambodia6 from '../../assets/cambodia/6.png';

// Import Abroad/International program images
import abroad1 from '../../assets/abroad/1.png';
import abroad2 from '../../assets/abroad/2.png';
import abroad3 from '../../assets/abroad/3.png';

// Import Internship images
import internship1 from '../../assets/internship/1.png';
import internship2 from '../../assets/internship/2.png';
import internship3 from '../../assets/internship/3.png';

export default function HomePage() {
    // Banner slides
    const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
    
    // Scholarship image arrays
    const cambodiaScholarships = [cambodia1, cambodia2, cambodia3, cambodia4, cambodia5, cambodia6];
    const abroadPrograms = [abroad1, abroad2, abroad3];
    const internships = [internship1, internship2, internship3];

    return (
      <div className="home-page">
        <Header/>
        
        {/* Hero Banner */}
        <HeroBanner slides={bannerSlides} />
        
        {/* Cambodia Scholarship Section */}
        <ScholarshipSection
          title="Cambodia Scholarship"
          subtitle="Here are some of the best college scholarships with approaching deadlines."
          items={cambodiaScholarships}
          linkTo="/scholarships/cambodia"
          type="scholarship"
        />
        
        {/* International Program Section */}
        <ScholarshipSection
          title="International Program"
          subtitle="Here are some of the best college scholarships with approaching deadlines."
          items={abroadPrograms}
          linkTo="/scholarships/abroad"
          type="scholarship"
        />
        
        {/* Internship Section */}
        <ScholarshipSection
          title="Internship"
          subtitle="Here are some of the best college scholarships with approaching deadlines."
          items={internships}
          linkTo="/scholarships/internship"
          type="internship"
        />
        
        <Footer />
      </div>
    );
}

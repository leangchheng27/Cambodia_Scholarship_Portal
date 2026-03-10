import React, { useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import HeroBanner from '../../features/home/components/HeroBanner/HeroBanner.jsx';
import AIScholarshipSection from '../../features/home/components/AIScholarshipSection/AIScholarshipSection.jsx';
import './HomePage.css';

// Import banner images
import banner1 from '../../assets/banner/p1.png';
import banner2 from '../../assets/banner/p2.jpg';
import banner3 from '../../assets/banner/p3.png';
import banner4 from '../../assets/banner/p4.png';
import banner5 from '../../assets/banner/p5.png';

export default function HomePage() {
    const { user, profile } = useAuth();
    
    // Merge user and profile data with useMemo to ensure new reference when dependencies change
    const userProfile = useMemo(() => {
      console.log('HomePage - Creating userProfile');
      console.log('User:', user);
      console.log('Profile:', profile);
      return user ? { ...user, ...profile } : null;
    }, [user, profile]);
    
    useEffect(() => {
      console.log('HomePage - userProfile changed:', userProfile);
    }, [userProfile]);
    
    // Banner slides
    const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

    return (
      <div className="home-page">
        <Header/>
        
        {/* Hero Banner */}
        <HeroBanner slides={bannerSlides} />
        
        {/* AI-Powered Cambodia Scholarship Section */}
        <AIScholarshipSection
          title="Cambodia Scholarship"
          subtitle="Here are some of the best college scholarships with approaching deadlines."
          userProfile={userProfile}
          type="cambodia"
          limit={8}
          linkTo="/scholarships/cambodia"
        />
        
        {/* AI-Powered International Program Section */}
        <AIScholarshipSection
          title="International Program"
          subtitle="Explore scholarship opportunities abroad with approaching deadlines."
          userProfile={userProfile}
          type="abroad"
          limit={8}
          linkTo="/scholarships/abroad"
        />
        
        <Footer />
      </div>
    );
}

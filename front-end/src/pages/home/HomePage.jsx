import React, { useMemo, useEffect, useState } from 'react';
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
    const [forceUpdate, setForceUpdate] = useState(0);
    
    // Force re-read profile when page is focused/visited
    useEffect(() => {
      const handleFocus = () => {
        console.log('HomePage - Page focused, forcing profile refresh');
        setForceUpdate(prev => prev + 1);
      };
      
      window.addEventListener('focus', handleFocus);
      // Trigger on mount as well
      handleFocus();
      
      return () => window.removeEventListener('focus', handleFocus);
    }, []);
    
    // Merge user and profile data with useMemo to ensure new reference when dependencies change
    const userProfile = useMemo(() => {
      console.log('HomePage - Creating userProfile');
      console.log('User:', user);
      console.log('Profile:', profile);
      
      // If no user but profile exists, use profile directly
      if (!user && profile) {
        return profile;
      }
      
      return user ? { ...user, ...profile } : null;
    }, [user, profile, forceUpdate]);
    
    useEffect(() => {
      console.log('HomePage - userProfile changed:', userProfile);
    }, [userProfile]);
    
    // Banner slides
    const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
    
    // Create a key to force re-render when profile changes
    const profileKey = userProfile ? JSON.stringify({ 
      hasGrades: !!userProfile.grades,
      gradeCount: userProfile.grades ? Object.keys(userProfile.grades).length : 0
    }) : 'no-profile';

    return (
      <div className="home-page">
        <Header/>
        
        {/* Hero Banner */}
        <HeroBanner slides={bannerSlides} />
        
        {/* AI-Powered Cambodia Scholarship Section */}
        <AIScholarshipSection
          key={`cambodia-${profileKey}`}
          title="Cambodia Scholarship"
          subtitle="Here are some of the best college scholarships with approaching deadlines."
          userProfile={userProfile}
          type="cambodia"
          limit={8}
          linkTo="/scholarships/cambodia"
        />
        
        {/* AI-Powered International Program Section */}
        <AIScholarshipSection
          key={`abroad-${profileKey}`}
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

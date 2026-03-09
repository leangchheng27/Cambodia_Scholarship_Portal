import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import HeroBanner from '../../features/home/components/HeroBanner/HeroBanner.jsx';
import CambodiaMap from '../../features/university/components/CambodiaMap/Map.jsx';
import UniversityFilter from '../../features/university/components/UniversityFilter/UniversityFilter.jsx';
import UniversityFilterMapLayout from '../../features/university/Layout/UniversityFilterMapLayout.jsx';
import UniversityList from '../../features/university/components/UniversityList/UniversityList.jsx';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './UniversityPage.css';
import banner1 from '../../assets/banner/p1.png';
import banner2 from '../../assets/banner/p2.jpg';
import banner3 from '../../assets/banner/p3.png';
import banner4 from '../../assets/banner/p4.png';
import banner5 from '../../assets/banner/p5.png';

export default function UniversityPage() {
    const navigate = useNavigate();
    const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
    const [selectedProvince, setSelectedProvince] = useState("Phnom Penh");

    const handleFirstUniversityClick = (universityId) => {
        navigate(`/universities/${universityId}`);
    };

    return (
      <>
        <Header/>
        <HeroBanner slides={bannerSlides} />
        <div className="university-page-container">
          <h1 className="university-page-title">Universities in Cambodia</h1>
          <UniversityFilterMapLayout>
            <UniversityFilter selectedProvince={selectedProvince} onProvinceSelect={setSelectedProvince} />
            <CambodiaMap />
          </UniversityFilterMapLayout>
          <UniversityList onUniversityClick={handleFirstUniversityClick} selectedProvince={selectedProvince} />
        </div>
        <Footer />
      </>
    );
}
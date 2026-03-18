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
      <div className="university-page">
        <Header/>
        <HeroBanner slides={bannerSlides} />
        <div className="resource-shell">
          <section className="resource-hero">
            <p className="resource-hero-eyebrow">Premium University Hub</p>
            <h1 className="resource-hero-title">University discovery with premium SaaS clarity.</h1>
            <p className="resource-hero-description">
              Compare universities, scan campuses, and move from directory discovery to full university detail pages in one smooth flow.
            </p>
            <div className="resource-hero-actions">
              <a className="resource-cta resource-cta-primary" href="#resource-directory">Browse Directory</a>
              <a className="resource-cta resource-cta-secondary" href="#resource-features">View Highlights</a>
            </div>
          </section>

          <nav className="resource-sticky-nav" aria-label="University page sections">
            <ul>
              <li><a href="#resource-features">Feature Grid</a></li>
              <li><a href="#resource-directory">Directory</a></li>
            </ul>
          </nav>

          <section id="resource-features" className="resource-section">
            <h2 className="resource-section-title">Directory flow that supports better decisions</h2>
            <p className="resource-section-description">Students can explore province filters, table listings, and jump directly into details pages.</p>
            <div className="resource-feature-grid">
              <article className="resource-feature-card">
                <h3>Map + filter overview</h3>
                <p>Start with province and map context before diving into university records.</p>
              </article>
              <article className="resource-feature-card">
                <h3>Structured comparison table</h3>
                <p>Name, province, and city remain readable with premium typography and spacing.</p>
              </article>
              <article className="resource-feature-card">
                <h3>One-click detail transition</h3>
                <p>Keep the same directory-to-details interaction without changing your data flow.</p>
              </article>
            </div>
          </section>

        <div id="resource-directory" className="university-page-container resource-posters">
          <div className="resource-poster-head">
            <div>
              <h2 className="resource-poster-title">University directory</h2>
              <p className="resource-poster-subtitle">Select any university row to open the full details page.</p>
            </div>
            <span className="resource-chip">Directory -> Details</span>
          </div>
          <h1 className="university-page-title">Universities in Cambodia</h1>
          <UniversityFilterMapLayout>
            <UniversityFilter selectedProvince={selectedProvince} onProvinceSelect={setSelectedProvince} />
            <CambodiaMap />
          </UniversityFilterMapLayout>
          <UniversityList onUniversityClick={handleFirstUniversityClick} selectedProvince={selectedProvince} />
        </div>
        </div>
        <Footer />
      </div>
    );
}
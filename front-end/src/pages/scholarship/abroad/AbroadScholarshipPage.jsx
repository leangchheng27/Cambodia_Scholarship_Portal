import React, { useState, useEffect } from 'react';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import ScholarshipCard from '../../../components/ScholarshipCard/ScholarshipCard';
import LoadingText from '../../../components/ui/LoadingText/LoadingText.jsx';
import API from '../../../services/api.js';
import './AbroadScholarshipPage.css';

// Import banner images
import banner1 from '../../../assets/banner/p1.png';
import banner2 from '../../../assets/banner/p2.jpg';
import banner3 from '../../../assets/banner/p3.png';
import banner4 from '../../../assets/banner/p4.png';
import banner5 from '../../../assets/banner/p5.png';

export default function AbroadScholarshipPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
  
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await API.get('/scholarships');
        setScholarships(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching scholarships:', err);
        setError('Failed to load scholarships');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(scholarships.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = scholarships.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="abroad-list-page">
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="page-header">
          <LoadingText text="Loading scholarships..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="abroad-list-page">
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="page-header">
          <p className="error">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="abroad-list-page">
      <Header />
      
      <HeroBanner slides={bannerSlides} />

      {/* Page Header */}
      <div className="resource-shell">
        <section className="resource-hero">
          <p className="resource-hero-eyebrow">Premium Scholarship Hub</p>
          <h1 className="resource-hero-title">International scholarships curated in a premium catalog experience.</h1>
          <p className="resource-hero-description">
            Browse global scholarship posters, compare options quickly, and jump into detailed requirements with one consistent flow.
          </p>
          <div className="resource-hero-actions">
            <a className="resource-cta resource-cta-primary" href="#resource-posters">Browse Posters</a>
            <a className="resource-cta resource-cta-secondary" href="#resource-features">View Highlights</a>
          </div>
        </section>

        <nav className="resource-sticky-nav" aria-label="Abroad scholarship sections">
          <ul>
            <li><a href="#resource-features">Feature Grid</a></li>
            <li><a href="#resource-posters">Posters</a></li>
          </ul>
        </nav>

        <section id="resource-features" className="resource-section">
          <h2 className="resource-section-title">Global opportunities, local clarity</h2>
          <p className="resource-section-description">The design is premium, but the core flow remains poster first and details second for speed.</p>
          <div className="resource-feature-grid">
            <article className="resource-feature-card">
              <h3>Visual-first filtering</h3>
              <p>Spot high-fit international opportunities from posters before reading the full brief.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Decision-ready detail pages</h3>
              <p>Tabs keep eligibility, programs, benefits, and source links organized for fast reviews.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Premium workflow velocity</h3>
              <p>Use a cleaner hierarchy to prioritize better scholarship options in less time.</p>
            </article>
          </div>
        </section>

      {/* Scholarship Grid */}
      <div id="resource-posters" className="scholarship-list-container resource-posters">
        <div className="resource-poster-head">
          <div>
            <h2 className="resource-poster-title">International scholarship posters</h2>
            <p className="resource-poster-subtitle">Open any poster to review complete scholarship details.</p>
          </div>
          <span className="resource-chip">Poster -> Details</span>
        </div>
        <div className="scholarship-grid">
          {currentScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              basePath="/scholarships/abroad"
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <button 
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ←
            </button>
          )}
          
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return <span key={pageNumber} className="page-dots">...</span>;
            }
            return null;
          })}
          
          {currentPage < totalPages && (
            <button 
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              →
            </button>
          )}
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}

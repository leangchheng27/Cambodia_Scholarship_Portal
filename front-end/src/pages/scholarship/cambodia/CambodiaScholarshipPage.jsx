import React, { useState, useEffect } from 'react';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import ScholarshipCard from '../../../components/ScholarshipCard/ScholarshipCard';
import LoadingText from '../../../components/ui/LoadingText/LoadingText.jsx';
import API from '../../../services/api.js';
import './CambodiaScholarshipPage.css';

// Import banner images
import banner1 from '../../../assets/banner/p1.png';
import banner2 from '../../../assets/banner/p2.jpg';
import banner3 from '../../../assets/banner/p3.png';
import banner4 from '../../../assets/banner/p4.png';
import banner5 from '../../../assets/banner/p5.png';

export default function CambodiaScholarshipPage() {
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
      <div className="cambodia-list-page">
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
      <div className="cambodia-list-page">
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
    <div className="cambodia-list-page">
      <Header />
      
      <HeroBanner slides={bannerSlides} />

      {/* Page Header */}
      <div className="resource-shell">
        <section className="resource-hero">
          <p className="resource-hero-eyebrow">Premium Scholarship Hub</p>
          <h1 className="resource-hero-title">Cambodia scholarship opportunities in a premium SaaS experience.</h1>
          <p className="resource-hero-description">
            Discover local scholarships through a polished poster-first workflow and dive into complete requirements in one click.
          </p>
          <div className="resource-hero-actions">
            <a className="resource-cta resource-cta-primary" href="#resource-posters">Browse Posters</a>
            <a className="resource-cta resource-cta-secondary" href="#resource-features">View Highlights</a>
          </div>
        </section>

        <nav className="resource-sticky-nav" aria-label="Scholarship page sections">
          <ul>
            <li><a href="#resource-features">Feature Grid</a></li>
            <li><a href="#resource-posters">Posters</a></li>
          </ul>
        </nav>

        <section id="resource-features" className="resource-section">
          <h2 className="resource-section-title">Purpose-built for scholarship decisions</h2>
          <p className="resource-section-description">Your existing poster to details flow is now wrapped in a stronger premium SaaS presentation.</p>
          <div className="resource-feature-grid">
            <article className="resource-feature-card">
              <h3>Poster-first browsing</h3>
              <p>Review opportunities visually before investing time in full scholarship requirements.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Structured detail tabs</h3>
              <p>Overview, eligibility, programs, benefits, and source links stay clear and scannable.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Priority-ready workflow</h3>
              <p>Shortlist faster with cleaner presentation and stronger content hierarchy.</p>
            </article>
          </div>
        </section>

      {/* Scholarship Grid */}
      <div id="resource-posters" className="scholarship-list-container resource-posters">
        <div className="resource-poster-head">
          <div>
            <h2 className="resource-poster-title">Scholarship posters</h2>
            <p className="resource-poster-subtitle">Choose a poster to open full scholarship details instantly.</p>
          </div>
          <span className="resource-chip">Poster -> Details</span>
        </div>
        <div className="scholarship-grid">
          {currentScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              basePath="/scholarships/cambodia"
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

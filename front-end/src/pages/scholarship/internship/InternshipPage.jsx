import React, { useState, useEffect } from 'react';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import ScholarshipCard from '../../../components/ScholarshipCard/ScholarshipCard';
import { getInternships } from '../../../api/internshipApi.js';
import LoadingText from '../../../components/ui/LoadingText/LoadingText.jsx';
import './InternshipPage.css';

// Import banner images
import banner1 from '../../../assets/banner/p1.png';
import banner2 from '../../../assets/banner/p2.jpg';
import banner3 from '../../../assets/banner/p3.png';
import banner4 from '../../../assets/banner/p4.png';
import banner5 from '../../../assets/banner/p5.png';

export default function InternshipPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
  
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const data = await getInternships();
        setInternships(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching internships:', err);
        setError('Failed to load internships');
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(internships.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInternships = internships.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="internship-list-page">
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="page-header">
          <LoadingText text="Loading internships..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="internship-list-page">
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
    <div className="internship-list-page">
      <Header />

      <div className="resource-hero-banner-wrap">
        <HeroBanner slides={bannerSlides} />
        <div className="resource-hero-banner-overlay">
          <div className="resource-shell">
            <section className="resource-hero resource-hero-on-banner">
              <h1 className="resource-hero-title">Internship opportunities presented like a premium SaaS catalog.</h1>
              <p className="resource-hero-description">
                Move from poster browsing to deep opportunity details with a faster, cleaner decision flow built for students and career starters.
              </p>
              <div className="resource-hero-actions">
                <a className="resource-cta resource-cta-primary" href="#resource-posters">Browse Posters</a>
                <a className="resource-cta resource-cta-secondary" href="#resource-features">View Highlights</a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="resource-shell">
        <section id="resource-features" className="resource-section">
          <h2 className="resource-section-title">Built around your real internship flow</h2>
          <p className="resource-section-description">This page stays aligned with your current app behavior: browse posters, open details, and review key information quickly.</p>
          <div className="resource-feature-grid">
            <article className="resource-feature-card">
              <h3>Poster-first browsing</h3>
              <p>Scan internship posters in a clean grid, then open the full detail page for the opportunity you want.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Structured detail tabs</h3>
              <p>Review Overview, Eligibility, Applicable Programs, Benefits, and Original Link in one organized detail layout.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Simple page navigation</h3>
              <p>Use pagination to move through internships and keep the browsing experience fast when listings grow.</p>
            </article>
          </div>
        </section>

      {/* Internship Grid */}
      <div id="resource-posters" className="scholarship-list-container resource-posters">
        <div className="resource-poster-head">
          <div>
            <h2 className="resource-poster-title">Internship posters</h2>
            <p className="resource-poster-subtitle">Select any poster to open the detailed internship page.</p>
          </div>
        </div>
        <div className="scholarship-grid">
          {currentInternships.map((internship) => (
            <ScholarshipCard
              key={internship.id}
              scholarship={internship}
              basePath="/scholarships/internship"
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

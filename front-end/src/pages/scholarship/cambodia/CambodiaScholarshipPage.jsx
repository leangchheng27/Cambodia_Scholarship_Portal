import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import ScholarshipCard from '../../../components/ScholarshipCard/ScholarshipCard';
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
          <p>Loading scholarships...</p>
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
      <div className="page-header">
        <h1 className="page-title">Cambodia Scholarship</h1>
        <p className="page-subtitle">
          Here are some of the best college scholarships with approaching deadlines.
        </p>
      </div>

      {/* Scholarship Grid */}
      <div className="scholarship-list-container">
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

      <Footer />
    </div>
  );
}

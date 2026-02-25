import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import './CambodiaScholarshipPage.css';
import { cambodiaScholarships } from '../../../data/cambodiaScholarships.js';

// Import banner images
import banner1 from '../../../assets/banner/p1.png';
import banner2 from '../../../assets/banner/p2.jpg';
import banner3 from '../../../assets/banner/p3.png';
import banner4 from '../../../assets/banner/p4.png';
import banner5 from '../../../assets/banner/p5.png';

export default function CambodiaScholarshipPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
  
  const itemsPerPage = 9;
  const totalPages = Math.ceil(cambodiaScholarships.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = cambodiaScholarships.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <div key={scholarship.id} className="scholarship-card">
              <div className="card-image-wrapper">
                <img 
                  src={scholarship.image} 
                  alt={scholarship.title} 
                  className="card-image" 
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{scholarship.title}</h3>
                <p className="card-description">{scholarship.description}</p>
                <Link 
                  to={`/scholarships/cambodia/detail/${scholarship.id}/overview`} 
                  className="view-detail-btn"
                >
                  View more detail 
                </Link>
              </div>
            </div>
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

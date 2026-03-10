import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import ScholarshipCard from '../../../components/ScholarshipCard/ScholarshipCard';
import './InternshipPage.css';
import { internshipScholarships } from '../../../data/internshipScholarships.js';

// Import banner images
import banner1 from '../../../assets/banner/p1.png';
import banner2 from '../../../assets/banner/p2.jpg';
import banner3 from '../../../assets/banner/p3.png';
import banner4 from '../../../assets/banner/p4.png';
import banner5 from '../../../assets/banner/p5.png';

export default function InternshipPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(internshipScholarships.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInternships = internshipScholarships.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="internship-list-page">
      <Header />
      
      <HeroBanner slides={bannerSlides} />

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Internship Opportunities</h1>
        <p className="page-subtitle">
          Find internship programs and opportunities with approaching deadlines.
        </p>
      </div>

      {/* Internship Grid */}
      <div className="scholarship-list-container">
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

      <Footer />
    </div>
  );
}

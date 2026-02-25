import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import './AbroadScholarshipPage.css';
import { abroadScholarships } from '../../../data/abroadScholarships.js';

// Import banner images
import banner1 from '../../../assets/banner/p1.png';
import banner2 from '../../../assets/banner/p2.jpg';
import banner3 from '../../../assets/banner/p3.png';
import banner4 from '../../../assets/banner/p4.png';
import banner5 from '../../../assets/banner/p5.png';

export default function AbroadScholarshipPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
  
  const itemsPerPage = 9;
  const totalPages = Math.ceil(abroadScholarships.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = abroadScholarships.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="abroad-list-page">
      <Header />
      
      <HeroBanner slides={bannerSlides} />

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">International Scholarship</h1>
        <p className="page-subtitle">
          Explore scholarship opportunities abroad with approaching deadlines.
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
                <p className="card-deadline">Deadline: {scholarship.deadline}</p>
                <Link 
                  to={`/scholarships/abroad/detail/${scholarship.id}/overview`} 
                  className="view-detail-btn"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>
            
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

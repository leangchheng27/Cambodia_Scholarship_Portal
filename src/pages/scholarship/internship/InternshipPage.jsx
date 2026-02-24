import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
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
  
  const itemsPerPage = 9;
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
            <div key={internship.id} className="scholarship-card">
              <div className="card-image-wrapper">
                <img 
                  src={internship.image} 
                  alt={internship.title} 
                  className="card-image" 
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{internship.title}</h3>
                <p className="card-description">{internship.description}</p>
                <p className="card-deadline">Deadline: {internship.deadline}</p>
                <Link 
                  to={`/scholarships/internship/detail/${internship.id}/overview`} 
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

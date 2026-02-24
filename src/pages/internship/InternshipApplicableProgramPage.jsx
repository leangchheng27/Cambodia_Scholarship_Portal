import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../layout/Header/Navbar';
import Footer from '../../layout/Footer/Footer';
import ScholarshipSidebar from '../../layout/Sidebar/ScholarshipSidebar';
import './internshipApplicableProgram.css';
import { getInternshipScholarshipById, relatedInternshipScholarships } from '../../data/internshipScholarships';

const InternshipApplicableProgramPage = () => {
  const { id } = useParams();

  // Get scholarship from centralized data
  const scholarshipData = getInternshipScholarshipById(id);
  const scholarship = scholarshipData.details;

  return (
    <div className="detail-page">
      <Navbar />

      {/* Banner Image */}
      <div className="detail-banner">
        <img src={scholarshipData.image} alt={scholarship.title} />
      </div>

      {/* Main Content */}
      <div className="detail-container">
        <ScholarshipSidebar id={id} basePath="/internship" activePage="program" />

        {/* Main Content Area */}
        <main className="detail-main">
          <div className="detail-header">
            <h1>{scholarship.title}</h1>
            <p className="subtitle">{scholarship.subtitle}</p>
          </div>

          <div className="tab-content">
            <div className="program-timeline">
              {scholarship.programs.map((program, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <p>{program}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* You Might Like Section */}
      <section className="related-section">
        <div className="section-container">
          <h2>Scholarship You might like</h2>
          <div className="related-grid">
            {relatedInternshipScholarships.map((item) => (
              <div key={item.id} className="related-card">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>អាហារូបករណ៍ទាំងនេះអាចជួយសិស្សានុសិស្សដែលមានសិទ្ធិទទួលបាន</p>
                <Link to={`/internship/detail/${item.id}/overview`} className="view-detail-link">
                  View more detail &gt;
                </Link>
              </div>
            ))}
          </div>
          <button className="view-more-btn">View More &gt;</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternshipApplicableProgramPage;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../layout/Header/Navbar';
import Footer from '../../layout/Footer/Footer';
import ScholarshipSidebar from '../../layout/Sidebar/ScholarshipSidebar';
import './internshipOverview.css';
import { getInternshipScholarshipById, relatedInternshipScholarships } from '../../data/internshipScholarships';

const InternshipOverviewPage = () => {
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
        <ScholarshipSidebar id={id} basePath="/internship" activePage="overview" />

        {/* Main Content Area */}
        <main className="detail-main">
          <div className="detail-header">
            <h1>{scholarship.title}</h1>
            <p className="subtitle">{scholarship.subtitle}</p>
          </div>

          <div className="tab-content">
            <div className="content-section">
              <h3>Funded By:</h3>
              <div className="info-item">
                <span className="icon">➥</span>
                <p>{scholarship.fundedBy}</p>
              </div>
            </div>

            <div className="content-section">
              <h3>Fields of Study</h3>
              <div className="info-item">
                <span className="icon">➱</span>
                <p>{scholarship.fieldsOfStudy}</p>
              </div>
            </div>

            <div className="content-section">
              <h3>Course Duration</h3>
              <div className="info-item">
                <span className="icon">⭕</span>
                <p>{scholarship.courseDuration}</p>
              </div>
            </div>

            <div className="content-section">
              <h3>Application Deadlines:</h3>
              {scholarship.deadlines.map((deadline, index) => (
                <div key={index} className="deadline-item">
                  <p>• {deadline.institute}: <strong>{deadline.date}</strong></p>
                </div>
              ))}

              <div className="registration-links">
                <div className="info-item">
                  <span className="icon">➲</span>
                  <p>Register via: <a href={`https://${scholarship.registrationLinks.website}`} target="_blank" rel="noopener noreferrer">{scholarship.registrationLinks.website}</a></p>
                </div>
                <div className="info-item">
                  <span className="icon">➤</span>
                  <p>Contact: {scholarship.registrationLinks.telegram}</p>
                </div>
                <div className="info-item">
                  <span className="icon">➤</span>
                  <p>Other overseas scholarship information:</p>
                  <a href={scholarship.overseasInfo.telegram} target="_blank" rel="noopener noreferrer" className="social-link">Telegram</a> |{' '}
                  <a href={scholarship.overseasInfo.facebook} target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
                </div>
              </div>
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

export default InternshipOverviewPage;

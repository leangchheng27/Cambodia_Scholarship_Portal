import React from 'react';
import './OverviewContent.css';

const OverviewContent = ({ scholarship }) => {
  return (
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
          {scholarship.overseasInfo && (
            <div className="info-item">
              <span className="icon">➤</span>
              <p>Other overseas scholarship information:</p>
              <ul className="overseas-links">
                <li>Telegram: <a href={scholarship.overseasInfo.telegram} target="_blank" rel="noopener noreferrer">{scholarship.overseasInfo.telegram}</a></li>
                <li>Facebook: <a href={scholarship.overseasInfo.facebook} target="_blank" rel="noopener noreferrer">{scholarship.overseasInfo.facebook}</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;

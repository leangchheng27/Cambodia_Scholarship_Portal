import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedScholarships.css';

const RelatedScholarships = ({ items, basePath, title = "Scholarship You might like" }) => {
  return (
    <section className="related-section">
      <div className="section-container">
        <h2>{title}</h2>
        <div className="related-grid">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="related-card">
              <img src={item.image} alt={item.title || item.details?.title} />
              <h3>{item.title || item.details?.title}</h3>
              <p>អាហារូបករណ៍ទាំងនេះអាចជួយសិស្សានុសិស្សដែលមានសិទ្ធិទទួលបាន</p>
              <Link to={`${basePath}/detail/${item.id}/overview`} className="view-detail-link">
                View more detail &gt;
              </Link>
            </div>
          ))}
        </div>
        <Link to={basePath} className="view-more-btn">View More &gt;</Link>
      </div>
    </section>
  );
};

export default RelatedScholarships;

import React from 'react';
import { Link } from 'react-router-dom';
import './ScholarshipTabs.css';

const ScholarshipTabs = ({ id, basePath, activePage, children }) => {
  const tabs = [
    { key: 'overview', label: 'Overview', path: `${basePath}/detail/${id}/overview` },
    { key: 'program', label: 'Application Program', path: `${basePath}/detail/${id}/program` },
    { key: 'benefits', label: 'Benefits', path: `${basePath}/detail/${id}/benefits` },
    { key: 'eligibility', label: 'Eligibility', path: `${basePath}/detail/${id}/eligibility` }
  ];

  return (
    <div className="scholarship-tabbed-section">
      <div className="scholarship-tab-navigation">
        <Link to={basePath} className="back-link">
          <span className="back-arrow">&lt;</span>
        </Link>
        {tabs.map(tab => (
          <Link
            key={tab.key}
            to={tab.path}
            className={`scholarship-tab${activePage === tab.key ? ' active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="scholarship-tab-content">
        {children}
      </div>
    </div>
  );
};

export default ScholarshipTabs;

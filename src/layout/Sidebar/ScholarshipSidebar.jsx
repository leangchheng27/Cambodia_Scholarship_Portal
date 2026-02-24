import React from 'react';
import { Link } from 'react-router-dom';
import './ScholarshipSidebar.css';

const ScholarshipSidebar = ({ id, basePath, activePage }) => {
  return (
    <aside className="detail-sidebar">
      <Link to={basePath} className="back-button">
        <span className="back-arrow">&lt;</span> 
      </Link>
      <nav className="sidebar-nav">
        <Link 
          to={`${basePath}/detail/${id}/overview`} 
          className={`nav-item ${activePage === 'overview' ? 'active' : ''}`}
        >
          Overview
        </Link>
        <Link 
          to={`${basePath}/detail/${id}/program`} 
          className={`nav-item ${activePage === 'program' ? 'active' : ''}`}
        >
          Application Program
        </Link>
        <Link 
          to={`${basePath}/detail/${id}/benefits`} 
          className={`nav-item ${activePage === 'benefits' ? 'active' : ''}`}
        >
          Benefits
        </Link>
        <Link 
          to={`${basePath}/detail/${id}/eligibility`} 
          className={`nav-item ${activePage === 'eligibility' ? 'active' : ''}`}
        >
          Eligibility
        </Link>
      </nav>
    </aside>
  );
};

export default ScholarshipSidebar;

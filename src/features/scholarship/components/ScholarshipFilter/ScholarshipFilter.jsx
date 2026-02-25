import React, { useState } from 'react';
import './ScholarshipFilter.css';

const ScholarshipFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    level: '',
    field: '',
    searchTerm: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = { level: '', field: '', searchTerm: '' };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className="scholarship-filter">
      <h3 className="filter-title">Filter Scholarships</h3>
      
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search scholarships..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="level">Education Level</label>
        <select
          id="level"
          value={filters.level}
          onChange={(e) => handleFilterChange('level', e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="high-school">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
          <option value="phd">PhD</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="field">Field of Study</label>
        <select
          id="field"
          value={filters.field}
          onChange={(e) => handleFilterChange('field', e.target.value)}
        >
          <option value="">All Fields</option>
          <option value="engineering">Engineering</option>
          <option value="business">Business</option>
          <option value="science">Science</option>
          <option value="arts">Arts</option>
          <option value="medicine">Medicine</option>
          <option value="education">Education</option>
        </select>
      </div>

      <button className="reset-btn" onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default ScholarshipFilter;

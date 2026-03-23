import React from 'react';
import './SearchInput.css';

const SearchInput = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchInput;
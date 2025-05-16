import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({ activeFilter, onFilterChange, onSearchChange, searchTerm }) {
  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'milik', label: 'Dimiliki' },
    { id: 'baca', label: 'Sedang Dibaca' },
    { id: 'beli', label: 'Ingin Dibeli' }
  ];

  return (
    <div className="book-filter">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default BookFilter;
import React from 'react';
import './SearchBar.css';
const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by Campaign Title or Name"
              value={query}
              className='search-bar'
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

// src/components/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue.toLowerCase());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
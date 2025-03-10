
import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue.toLowerCase());
    setInputValue(''); 
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
     
    }
  };

  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toLowerCase())} 
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

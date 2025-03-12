
import React from 'react';
import styles from './PokemonFilter/PokemonFilter.module.css';

interface PaginationProps {
  page: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  totalPages?: number;
  onPageSelect?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  handleNextPage,
  handlePreviousPage,
  isPreviousDisabled,
  isNextDisabled,
  totalPages = 5,
  onPageSelect,
}) => {
  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(0, page - 2);
    const endPage = Math.min(startPage + 4, totalPages - 1);
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i}
          className={`${styles['pagination-button']} ${page === i ? styles['active-page'] : ''}`}
          onClick={() => onPageSelect && onPageSelect(i)}
          disabled={page === i}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className={styles.pagination}>
      <button 
        className={styles['pagination-button']} 
        onClick={handlePreviousPage} 
        disabled={isPreviousDisabled}
      >
        Previous
      </button>
      
      {onPageSelect && renderPageButtons()}
      
      {!onPageSelect && (
        <div className={styles['page-info']}>
          Page {page + 1}
        </div>
      )}
      
      <button 
        className={styles['pagination-button']} 
        onClick={handleNextPage} 
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

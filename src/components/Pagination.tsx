
import React from 'react';

interface PaginationProps {
  page: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  handleNextPage,
  handlePreviousPage,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <div>
      <button onClick={handlePreviousPage} disabled={isPreviousDisabled}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={isNextDisabled}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

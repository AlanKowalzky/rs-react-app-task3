// src/components/Pagination/Pagination.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockHandleNextPage = jest.fn();
  const mockHandlePreviousPage = jest.fn();

  it('renders the component', () => {
    render(
      <Pagination
        page={0}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
        isPreviousDisabled={true}
        isNextDisabled={false}
      />
    );
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('disables Previous button on the first page', () => {
    render(
      <Pagination
        page={0}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
        isPreviousDisabled={true}
        isNextDisabled={false}
      />
    );
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables Next button when hasMore is false', () => {
    render(
      <Pagination
        page={0}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
        isPreviousDisabled={false}
        isNextDisabled={true}
      />
    );
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('calls handlePreviousPage when Previous button is clicked', () => {
    render(
      <Pagination
        page={1}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
        isPreviousDisabled={false}
        isNextDisabled={false}
      />
    );
    const previousButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(previousButton);
    expect(mockHandlePreviousPage).toHaveBeenCalled();
  });

  it('calls handleNextPage when Next button is clicked', () => {
    render(
      <Pagination
        page={0}
        handleNextPage={mockHandleNextPage}
        handlePreviousPage={mockHandlePreviousPage}
        isPreviousDisabled={false}
        isNextDisabled={false}
      />
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockHandleNextPage).toHaveBeenCalled();
  });
});

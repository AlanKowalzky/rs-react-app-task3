
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';

import SearchBar from './SearchBar';

test('updates search value and triggers search', () => {
  const mockOnSearch = jest.fn(); 
  render(<SearchBar onSearch={mockOnSearch} />);

  
  const input = screen.getByPlaceholderText('Search Pokemon');
  fireEvent.change(input, { target: { value: 'pikachu' } });

  
  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  
  expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
});
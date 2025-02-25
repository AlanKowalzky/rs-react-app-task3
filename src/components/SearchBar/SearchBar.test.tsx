// src/components/SearchBar/SearchBar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';

import SearchBar from './SearchBar';

test('updates search value and triggers search', () => {
  const mockOnSearch = jest.fn(); // Mock funkcji onSearch
  render(<SearchBar onSearch={mockOnSearch} />);

  // Wprowadź wartość do inputa
  const input = screen.getByPlaceholderText('Search Pokemon');
  fireEvent.change(input, { target: { value: 'pikachu' } });

  // Kliknij przycisk "Search"
  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  // Sprawdź, czy funkcja onSearch została wywołana z prawidłową wartością
  expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
});
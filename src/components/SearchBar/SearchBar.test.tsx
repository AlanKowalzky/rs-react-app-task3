// src/components/SearchBar/SearchBar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom'; 
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
test('calls onSearch when Enter key is pressed', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);
  
  const input = screen.getByPlaceholderText('Search Pokemon');
  fireEvent.change(input, { target: { value: 'pikachu' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  
  expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  expect(input).toHaveValue('');
});

test('does not call onSearch when a different key is pressed', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);
  
  const input = screen.getByPlaceholderText('Search Pokemon');
  fireEvent.change(input, { target: { value: 'pikachu' } });
  fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
  
  expect(mockOnSearch).not.toHaveBeenCalled();
  expect(input).toHaveValue('pikachu');
});
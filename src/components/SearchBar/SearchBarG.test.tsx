import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';

import SearchBar from './SearchBar';

test('updates search value and triggers search', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement; // Dodana asercja typu
  fireEvent.change(input, { target: { value: 'pikachu' } });

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
});

test('triggers search on Enter key press', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
  
    const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'charizard' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' }); // Poprawione na keyPress
  
    expect(mockOnSearch).toHaveBeenCalledWith('charizard'); // Sprawdzamy, czy onSearch zostało wywołane
});

test('clears input field', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
  
    const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement; // Dodana asercja typu
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input.value).toBe('pikachu');
    
    fireEvent.click(screen.getByText('Search'));
    expect(input.value).toBe('');
});

test('input value change', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement; // Dodana asercja typu

    const testString = 'abc';
    for (let i = 0; i < testString.length; i++) {
        fireEvent.change(input, { target: { value: testString.substring(0, i + 1).toUpperCase() } });
        expect(input.value).toBe(testString.substring(0, i + 1).toLowerCase());
    }
    const testString2 = 'cba';
    for (let i = 0; i < testString2.length; i++) {
        fireEvent.change(input, { target: { value: testString2.substring(0, i + 1).toUpperCase() } });
        expect(input.value).toBe(testString2.substring(0, i + 1).toLowerCase());
    }
});

test('displays each typed character in the input field', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement;
  const characters = 'abcdefg';

  for (const char of characters) {
    fireEvent.change(input, { target: { value: char } });
    expect(input.value).toBe(char.toLowerCase()); // Sprawdzamy, czy znak się pojawia i jest maly
  }
});

test('clears input field when Search button is pressed', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'pikachu' } });

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  expect(input.value).toBe(''); // Sprawdzamy, czy pole input zostało wyczyszczone
});

test('clears input field when Enter is pressed', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'pikachu' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

  expect(input.value).toBe(''); // Sprawdzamy, czy pole input zostało wyczyszczone
});

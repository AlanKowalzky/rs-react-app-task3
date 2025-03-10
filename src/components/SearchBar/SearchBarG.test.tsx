import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';

import SearchBar from './SearchBar';

test('updates search value and triggers search', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement; 
  fireEvent.change(input, { target: { value: 'pikachu' } });

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
});

test('input value change', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement; 

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
    expect(input.value).toBe(char.toLowerCase()); 
  }
});

test('clears input field when Search button is pressed', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText('Search Pokemon') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'pikachu' } });

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);

  expect(input.value).toBe(''); 
});

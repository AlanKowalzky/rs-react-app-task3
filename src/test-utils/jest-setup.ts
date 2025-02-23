// src/test-utils/jest-setup.ts
import '@testing-library/jest-dom';

// Extend window interface to allow fetch mock
declare global {
  interface Window {
    fetch: jest.Mock;
  }
}

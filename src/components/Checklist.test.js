import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checklist from './Checklist';

// Mock the analytics and pdfGenerator utilities
jest.mock('../utils/analytics', () => ({
  initAnalytics: jest.fn(),
  trackTaskComplete: jest.fn(),
  trackTaskUncomplete: jest.fn(),
  trackSectionToggle: jest.fn(),
  trackSaveChecklist: jest.fn(),
  trackPDFDownload: jest.fn(),
  trackClearData: jest.fn(),
}));

jest.mock('../utils/pdfGenerator', () => ({
  downloadWeddingChecklistPDF: jest.fn().mockResolvedValue(true),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Checklist Component', () => {
  beforeEach(() => {
    // Clear any previous localStorage mock data and reset mocks
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('renders the Checklist component correctly', () => {
    render(<Checklist />);
    
    // Check for main heading
    expect(screen.getByText('Vowly Wedding Checklist')).toBeInTheDocument();
    
    // Check for personalization section
    expect(screen.getByLabelText('Couple Names:')).toBeInTheDocument();
    expect(screen.getByLabelText('Wedding Date:')).toBeInTheDocument();
    
    // Check for action buttons
    expect(screen.getByText('Clear All Data')).toBeInTheDocument();
    expect(screen.getByText('Download as PDF')).toBeInTheDocument();
    expect(screen.getByText('Save Checklist')).toBeInTheDocument();
  });

  test('toggles month sections when clicked', () => {
    render(<Checklist />);
    
    // The first section "12+ Months Before" should be expanded by default
    expect(screen.getByText('Set a budget')).toBeInTheDocument();
    
    // Click the header to collapse the section
    fireEvent.click(screen.getByText('12+ Months Before'));
    
    // The tasks should now be hidden
    expect(screen.queryByText('Set a budget')).not.toBeInTheDocument();
    
    // Click again to expand
    fireEvent.click(screen.getByText('12+ Months Before'));
    
    // Tasks should be visible again
    expect(screen.getByText('Set a budget')).toBeInTheDocument();
  });

  test('toggles task completion when clicked', () => {
    render(<Checklist />);
    
    // Find the checkbox for "Set a budget"
    const checkbox = screen.getByLabelText('Set a budget');
    
    // Initially it should be unchecked
    expect(checkbox.checked).toBe(false);
    
    // Click to check it
    fireEvent.click(checkbox);
    
    // It should now be checked
    expect(checkbox.checked).toBe(true);
    
    // Click again to uncheck
    fireEvent.click(checkbox);
    
    // It should be unchecked again
    expect(checkbox.checked).toBe(false);
  });

  test('saves couple names and wedding date', () => {
    render(<Checklist />);
    
    // Find inputs
    const coupleNamesInput = screen.getByLabelText('Couple Names:');
    const weddingDateInput = screen.getByLabelText('Wedding Date:');
    
    // Enter data
    fireEvent.change(coupleNamesInput, { target: { value: 'Alex & Jordan' } });
    fireEvent.change(weddingDateInput, { target: { value: '2025-06-15' } });
    
    // Check values were updated
    expect(coupleNamesInput.value).toBe('Alex & Jordan');
    expect(weddingDateInput.value).toBe('2025-06-15');
  });

  test('calculates progress correctly', () => {
    render(<Checklist />);
    
    // Initially progress should be 0%
    expect(screen.getByText('Your Wedding Planning Progress: 0%')).toBeInTheDocument();
    
    // Check the first task
    fireEvent.click(screen.getByLabelText('Set a budget'));
    
    // Progress should now be updated (in this test we won't calculate the exact percentage)
    expect(screen.queryByText('Your Wedding Planning Progress: 0%')).not.toBeInTheDocument();
  });
});

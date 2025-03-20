import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailCapture from './EmailCapture';

describe('EmailCapture Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // Reset the mocks before each test
    jest.clearAllMocks();
  });

  test('renders the EmailCapture modal correctly', () => {
    render(<EmailCapture onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Check for heading and descriptions
    expect(screen.getByText('Save Your Wedding Checklist')).toBeInTheDocument();
    expect(screen.getByText(/Enter your details below/)).toBeInTheDocument();
    
    // Check for form inputs
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByText('Save & Send')).toBeInTheDocument();
  });

  test('validates email input', async () => {
    render(<EmailCapture onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Get form fields
    const nameInput = screen.getByLabelText('Your Name');
    const emailInput = screen.getByLabelText('Email Address');
    const submitButton = screen.getByText('Save & Send');
    
    // Enter invalid email
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Error message should be displayed
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    
    // onSubmit should not have been called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits the form with valid inputs', async () => {
    // Replace setTimeout with immediate resolution for testing
    jest.useFakeTimers();
    
    render(<EmailCapture onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Get form fields
    const nameInput = screen.getByLabelText('Your Name');
    const emailInput = screen.getByLabelText('Email Address');
    const submitButton = screen.getByText('Save & Send');
    
    // Enter valid data
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Wait for async submission
    await waitFor(() => {
      expect(screen.getByText('Thank you! Your checklist has been saved and sent to your email.')).toBeInTheDocument();
    });
    
    // Button should show saving state
    expect(screen.getByText('Saving...')).toBeInTheDocument();
    
    // onSubmit should have been called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
    });
    
    // Advance timers to trigger the auto-close
    jest.advanceTimersByTime(3000);
    
    // onClose should have been called
    expect(mockOnClose).toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  test('closes the modal when the close button is clicked', () => {
    render(<EmailCapture onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    
    // Find and click the close button
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    // onClose should have been called
    expect(mockOnClose).toHaveBeenCalled();
  });
});

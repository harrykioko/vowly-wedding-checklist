import React, { useState } from 'react';
import '../styles/EmailCapture.css';

const EmailCapture = ({ onClose, actionType = 'save', coupleNames = '', weddingDate = '', checklistData = [] }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Determine title and messages based on action type
  const getTitle = () => {
    return actionType === 'save' 
      ? 'Save Your Wedding Checklist' 
      : 'Download Your Wedding Checklist';
  };
  
  const getDescription = () => {
    return actionType === 'save'
      ? 'Enter your details below to save your progress and receive your checklist by email.'
      : 'Enter your details below to download your personalized wedding checklist as a PDF.';
  };
  
  const getButtonText = () => {
    if (isSubmitting) {
      return actionType === 'save' ? 'Saving...' : 'Processing...';
    }
    return actionType === 'save' ? 'Save & Send' : 'Download PDF';
  };
  
  const getSuccessMessage = () => {
    return actionType === 'save'
      ? 'Thank you! Your checklist has been saved and sent to your email.'
      : 'Thank you! Your checklist PDF has been generated and is downloading now.';
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccessMessage('');
    
    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for API call
      const formData = {
        email,
        name,
        coupleNames,
        weddingDate,
        checklistData,
        actionType
      };
      
      // Simulate API call to backend service
      console.log('Processing request with data:', formData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (actionType === 'download') {
        // Simulate PDF download
        console.log('Generating PDF download...');
        
        // Create a dummy PDF download link (in a real app, this would be an actual PDF)
        const dummyLink = document.createElement('a');
        dummyLink.href = '#';
        dummyLink.setAttribute('download', `Vowly_Wedding_Checklist_${new Date().toISOString().split('T')[0]}.pdf`);
        dummyLink.click();
      }
      
      setSuccessMessage(getSuccessMessage());
      
      // Reset form after successful submission
      setEmail('');
      setName('');
      
      // Close the modal after a delay
      const closeDelay = actionType === 'save' ? 3000 : 2000;
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, closeDelay);
      
    } catch (error) {
      console.error(`Error during ${actionType} action:`, error);
      setError(`There was an error processing your request. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="email-capture-overlay">
      <div className="email-capture-modal">
        <button className="close-button" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="email-capture-content">
          <h2>{getTitle()}</h2>
          <p>{getDescription()}</p>
          
          {error && <div className="error-message" role="alert">{error}</div>}
          {successMessage && <div className="success-message" role="status">{successMessage}</div>}
          
          {!successMessage && (
            <form onSubmit={handleSubmit} className="email-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <div className="input-container">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="form-helper-text">We'll never share your email with anyone else</div>
              </div>
              
              <button 
                type="submit" 
                className={`submit-button ${actionType}-button`}
                disabled={isSubmitting}
              >
                {getButtonText()}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;

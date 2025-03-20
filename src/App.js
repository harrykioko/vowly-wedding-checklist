import React, { useState } from 'react';
import './App.css';
import Checklist from './components/Checklist';
import EmailCapture from './components/EmailCapture';

function App() {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [checklistData, setChecklistData] = useState(null);

  // Handler for the Save button in Checklist component
  const handleSaveRequest = (data) => {
    setChecklistData(data);
    setShowEmailCapture(true);
  };

  // Handler for email submission
  const handleEmailSubmit = (userInfo) => {
    console.log('Email submitted:', userInfo.email);
    console.log('Checklist data to be sent:', checklistData);
    
    // In a real implementation, this is where you would send the data to your backend
    // which would then use Sendgrid to send the email with the checklist data
  };

  return (
    <div className="App">
      <div className="App-container">
        <Checklist onSave={handleSaveRequest} />
        
        {showEmailCapture && (
          <EmailCapture 
            onClose={() => setShowEmailCapture(false)}
            onSubmit={handleEmailSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;

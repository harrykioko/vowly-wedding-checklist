import React, { useState, useEffect } from 'react';
import vowlyLogo from '../assets/images/vowly-logo.svg';
import '../styles/Checklist.css';
import EmailCapture from './EmailCapture';

const Checklist = () => {
  // State for couple names and checklist data
  const [coupleNames, setCoupleNames] = useState('');
  const [nameInputValue, setNameInputValue] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [activePhase, setActivePhase] = useState(0);
  // Redesigned checklist data with phases instead of months
  const [checklistData, setChecklistData] = useState([
    {
      id: 1,
      phase: 'Big Picture Planning',
      timeframe: '12+ to 10 months',
      color: '#7D9D74', // Updated to sage green from original green
      icon: 'compass',
      tip: 'When ordering invitations, order 25% more than your guest count to account for mistakes, last-minute additions, and keepsakes. And don\'t forget to weigh your assembled invitation suite for accurate postage!',
      tasks: [
        { text: 'Choose a wedding date (and backup date)', completed: false },
        { text: 'Determine your budget', completed: false },
        { text: 'Draft initial guest list', completed: false },
        { text: 'Research venues for ceremony and reception', completed: false },
        { text: 'Start researching key vendors (photographer, videographer, DJ/band, caterer)', completed: false },
        { text: 'Schedule engagement photos', completed: false },
        { text: 'Choose the style/theme of your wedding', completed: false },
        { text: 'Pick your wedding party', completed: false },
        { text: 'Create a wedding website', completed: false },
        { text: 'Mail save-the-dates', completed: false }
      ]
    },
    {
      id: 2,
      phase: 'Bringing the Vision to Life',
      timeframe: '10 to 6 months',
      color: '#8e7cc3', // Purple
      icon: 'lightbulb',
      tip: 'Book your favorite vendors early, especially photographers and popular venues, as they often book 12-18 months in advance for peak wedding season dates.',
      tasks: [
        { text: 'Research florists', completed: false },
        { text: 'Book ceremony and reception venues', completed: false },
        { text: 'Book officiant', completed: false },
        { text: 'Book your priority vendors', completed: false },
        { text: 'Start looking at wedding dress styles', completed: false },
        { text: 'Research honeymoon destinations', completed: false },
        { text: 'Research hotels near venue for out-of-town guests', completed: false },
        { text: 'Finalize guest list', completed: false },
        { text: 'Choose bridesmaid attire and accessories', completed: false },
        { text: 'Register for gifts', completed: false },
        { text: 'Book florist', completed: false },
        { text: 'Research wedding favors', completed: false },
        { text: 'Start planning honeymoon', completed: false }
      ]
    },
    {
      id: 3,
      phase: 'The Nitty Gritty',
      timeframe: '6 to 3 months',
      color: '#e69138', // Orange
      icon: 'checklist',
      tip: 'When ordering invitations, order 25% more than your guest count to account for mistakes, last-minute additions, and keepsakes. And don\'t forget to weigh your assembled invitation suite for accurate postage!',
      tasks: [
        { text: 'Decide on wedding cake style and flavor', completed: false },
        { text: 'Research hair and makeup; book stylist', completed: false },
        { text: 'Meet with officiant to plan ceremony', completed: false },
        { text: 'Choose groom\'s and groomsmen attire', completed: false },
        { text: 'Book transportation to and from venue', completed: false },
        { text: 'Purchase wedding bands', completed: false },
        { text: 'Book rehearsal dinner venue', completed: false },
        { text: 'Research wedding invitation designs', completed: false },
        { text: 'Order wedding invitations', completed: false },
        { text: 'Order wedding cake', completed: false },
        { text: 'Book accommodations for wedding night', completed: false },
        { text: 'Book honeymoon flights and hotels', completed: false },
        { text: 'Work with florist to decide on flowers', completed: false },
        { text: 'Plan welcome bags for out-of-town guests', completed: false },
        { text: 'Schedule dress fittings and alterations', completed: false },
        { text: 'Decide on a playlist for DJ or band', completed: false },
        { text: 'Order favors', completed: false }
      ]
    },
    {
      id: 4,
      phase: 'The Final Touches',
      timeframe: '3 to 2 months',
      color: '#e6c200', // Light gold
      icon: 'magic-wand',
      tip: 'Create a detailed day-of timeline and share it with your wedding party and vendors. Include buffer time between activities — everything takes longer than you think on the wedding day!',
      tasks: [
        { text: 'Finalize timeline for ceremony and reception', completed: false },
        { text: 'Purchase wedding decor and accessories', completed: false },
        { text: 'Order gifts for bridal party, parents and helpers', completed: false },
        { text: 'Finalize reception menu with caterer', completed: false },
        { text: 'Order menu cards', completed: false },
        { text: 'Order rehearsal dinner invitations', completed: false },
        { text: 'Mail invitations', completed: false },
        { text: 'Develop system for organizing RSVPs', completed: false },
        { text: 'Write wedding vows', completed: false },
        { text: 'Review ceremony details with officiant', completed: false },
        { text: 'Decide on content for programs', completed: false }
      ]
    },
    {
      id: 5,
      phase: 'The Home Stretch',
      timeframe: '2 to 1 month',
      color: '#4a86e8', // Soft blue
      icon: 'heart',
      tip: 'When creating your seating chart, use movable sticky notes or a digital tool instead of writing directly on paper. You\'ll likely need to make several adjustments as RSVPs come in.',
      tasks: [
        { text: 'Apply for marriage license', completed: false },
        { text: 'Finalize seating arrangements', completed: false },
        { text: 'Create a schedule for your wedding day to distribute to vendors', completed: false },
        { text: 'Order welcome bags', completed: false },
        { text: 'Attend final dress fitting', completed: false },
        { text: 'Pick up wedding rings', completed: false },
        { text: 'Confirm honeymoon reservations and pack', completed: false },
        { text: 'Check in with vendors to confirm details', completed: false },
        { text: 'Pick up marriage license', completed: false },
        { text: 'Order thank you notes', completed: false },
        { text: 'Get final headcount to caterer', completed: false },
        { text: 'Finalize seating chart', completed: false },
        { text: 'Send wedding day schedule to everyone involved', completed: false }
      ]
    },
    {
      id: 6,
      phase: 'Ready, Set, Almost There!',
      timeframe: '1-2 weeks before',
      color: '#cc0099', // Magenta/Pink
      icon: 'handshake',
      tip: 'Delegate small tasks to trusted friends and family members so you can focus on self-care in the final days. Staying rested and centered will help you enjoy every moment of your wedding day.',
      tasks: [
        { text: 'Follow up with any guests who haven\'t RSVP\'d', completed: false },
        { text: 'Give final head count to caterer', completed: false },
        { text: 'Make sure musicians/DJ have playlists', completed: false },
        { text: 'Get final haircut and color', completed: false },
        { text: 'Have final payments and cash tips on hand for all vendors', completed: false },
        { text: 'Provide any readers scripts for readings', completed: false },
        { text: 'Deliver "must-have" image lists to your photographer and videographer', completed: false },
        { text: 'Make sure everything\'s laid out and packed for your wedding day', completed: false },
        { text: 'Deliver welcome bags to hotels', completed: false },
        { text: 'Get mani/pedi', completed: false },
        { text: 'Attend wedding rehearsal and dinner', completed: false },
        { text: 'Get beauty sleep; don\'t stay up too late', completed: false }
      ]
    },
    {
      id: 7,
      phase: 'Showtime!',
      timeframe: 'The Big Day',
      color: '#e6af00', // Celebratory gold
      icon: 'finish',
      tip: 'Pack an emergency kit with safety pins, fashion tape, pain relievers, stain remover, and makeup for touch-ups. Assign a trusted friend to be the kit keeper on your wedding day.',
      tasks: [
        { text: 'Eat a healthy, hearty breakfast', completed: false },
        { text: 'Give Best Man wedding rings and officiant fee', completed: false },
        { text: 'Take a deep breath and relax - it\'s time to enjoy the day you\'ve spent so much time planning!', completed: false }
      ]
    }
  ]);

  // State for managing EmailCapture modals
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalAction, setModalAction] = useState('');

  // State for open/closed sections
  const [openSections, setOpenSections] = useState({});

  // Load saved names from localStorage on component mount
  useEffect(() => {
    const savedNames = localStorage.getItem('coupleNames');
    if (savedNames) {
      setCoupleNames(savedNames);
      setShowNameInput(false);
    }
  }, []);

  // Initialize open sections on first render
  useEffect(() => {
    const initialOpenSections = {};
    checklistData.forEach((phase, index) => {
      initialOpenSections[index] = index === activePhase; // Only active phase open by default
    });
    setOpenSections(initialOpenSections);
  }, [activePhase, checklistData]);

  // Calculate progress percentage
  const calculateProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;
    checklistData.forEach(phase => {
      totalTasks += phase.tasks.length;
      completedTasks += phase.tasks.filter(task => task.completed).length;
    });
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  // Calculate phase progress
  const calculatePhaseProgress = (phaseIndex) => {
    const phase = checklistData[phaseIndex];
    if (!phase) return 0;
    
    const totalTasks = phase.tasks.length;
    const completedTasks = phase.tasks.filter(task => task.completed).length;
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  // Get a congratulatory message based on progress
  // const getProgressMessage = (progress) => {
  //   if (progress === 100) return "Congratulations! You're all set for the big day!";
  //   if (progress >= 75) return "Almost there! The finish line is in sight!";
  //   if (progress >= 50) return "Halfway there! Keep up the great work!";
  //   if (progress >= 25) return "Great start! You're making excellent progress!";
  //   if (progress > 0) return "You've started your journey! Keep going!";
  //   return "";
  // };

  // Handle task checkbox toggle
  const handleTaskToggle = (phaseIndex, taskIndex) => {
    const newData = [...checklistData];
    newData[phaseIndex].tasks[taskIndex].completed = !newData[phaseIndex].tasks[taskIndex].completed;
    
    // Add animation class for completed tasks
    if (newData[phaseIndex].tasks[taskIndex].completed) {
      const taskElement = document.getElementById(`task-${phaseIndex}-${taskIndex}`);
      if (taskElement) {
        taskElement.classList.add('just-completed');
        setTimeout(() => {
          taskElement.classList.remove('just-completed');
        }, 1000);
      }
      
      // Check if all tasks in the phase are completed
      const phaseCompleted = newData[phaseIndex].tasks.every(task => task.completed);
      if (phaseCompleted) {
        // Show celebration for completed phase
        const phaseElement = document.getElementById(`phase-${phaseIndex}`);
        if (phaseElement) {
          phaseElement.classList.add('phase-completed');
          setTimeout(() => {
            phaseElement.classList.remove('phase-completed');
          }, 2000);
        }
      }
    }
    
    setChecklistData(newData);
  };

  // Toggle section open/closed
  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Handle phase selection
  const handlePhaseSelect = (index) => {
    setActivePhase(index);
    
    // Open the selected phase section
    setOpenSections(prev => {
      const newSections = {};
      checklistData.forEach((_, i) => {
        newSections[i] = i === index;
      });
      return newSections;
    });
    
    // Scroll to the selected phase
    const phaseElement = document.getElementById(`phase-${index}`);
    if (phaseElement) {
      phaseElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle save button click
  const handleSave = () => {
    if (!coupleNames) {
      alert('Please enter couple names before saving.');
      return;
    }
    setModalAction('save');
    setShowEmailModal(true);
  };

  // Handle download PDF button click
  const handleDownloadPDF = () => {
    if (!coupleNames) {
      alert('Please enter couple names before downloading.');
      return;
    }
    setModalAction('download');
    setShowEmailModal(true);
  };

  // Handle clear button click
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const clearedData = checklistData.map(phase => ({
        ...phase,
        tasks: phase.tasks.map(task => ({ ...task, completed: false }))
      }));
      setChecklistData(clearedData);
      setCoupleNames('');
    }
  };

  // Close email modal
  const handleCloseModal = () => {
    setShowEmailModal(false);
  };

  // Handle submission of names
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (nameInputValue.trim()) {
      setCoupleNames(nameInputValue.trim());
      localStorage.setItem('coupleNames', nameInputValue.trim());
      
      // Add fade-out animation to input form
      const inputSection = document.querySelector('.input-section');
      if (inputSection) {
        inputSection.classList.add('fade-out');
        setTimeout(() => {
          setShowNameInput(false);
        }, 500);
      }
    }
  };

  // Handle keypress for enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && nameInputValue.trim()) {
      e.preventDefault();
      
      // Add ripple animation to button
      const button = document.querySelector('.begin-button');
      if (button) {
        button.classList.remove('ripple-animation');
        button.classList.add('ripple-animation');
        
        // Remove animation class after it completes
        setTimeout(() => {
          button.classList.remove('ripple-animation');
        }, 800);
      }
      
      handleNameSubmit(e);
    }
  };

  // Toggle floating animation on hover
  const handleButtonHover = (isHovering) => {
    const button = document.querySelector('.begin-button');
    if (button) {
      if (isHovering) {
        button.classList.add('floating-animation');
      } else {
        button.classList.remove('floating-animation');
      }
    }
  };

  // Add pulse animation after input has value
  const handleInputChange = (e) => {
    setNameInputValue(e.target.value);
    
    const button = document.querySelector('.begin-button');
    if (button && e.target.value.trim()) {
      if (!button.classList.contains('pulse-animation')) {
        button.classList.add('pulse-animation');
      }
    } else if (button) {
      button.classList.remove('pulse-animation');
    }
  };

  // Handle edit of saved names
  const handleEditNames = () => {
    setNameInputValue(coupleNames);
    setShowNameInput(true);
  };

  // const progress = calculateProgress();
  // const progressMessage = getProgressMessage(progress);
  // const circumference = 2 * Math.PI * 47; // SVG circle circumference (r=47)
  // const dashoffset = circumference - (progress / 100) * circumference;

  // Icons for each phase
  const getPhaseIcon = (iconName) => {
    switch(iconName) {
      case 'compass':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="phase-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
          </svg>
        );
      case 'lightbulb':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="phase-icon">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
          </svg>
        );
      case 'checklist':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="phase-icon">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
        );
      case 'finish':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="phase-icon">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'magic-wand':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="phase-icon">
            <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a1.001 1.001 0 00-1.42 0L1.39 18.36c-.39.39-.39 1.02 0 1.41l.71.71c.39.39 1.02.39 1.41 0L14.13 9.41c.39-.39.39-1.02.0-1.41l-.76-.71z"/>
          </svg>
        );
      case 'heart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="phase-icon">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'handshake':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="phase-icon">
            <path d="M11 6H9V4h2v2zm4-2h-2v2h2V4zM9 14h2v-2H9v2zm10-4V8c0-1.1-.9-2-2-2h-6v2h6v2h-2v2h2c1.1 0 2-.9 2-2zm-6 8c1.1 0 2-.9 2-2h-2v2zM9 8v2h-.5C7.57 10 7 10.57 7 11.5c0 .93.57 1.5 1.5 1.5H12l-3.4 4.72c-.28.39-.72.63-1.2.65-1.24.05-2.4-.88-2.4-2.12V8c0-2.21 1.79-4 4-4h.8L8.6 2.4 10 1l4 4-4 4-1.4-1.4 1.12-1.1c-1.47.03-2.72 1.23-2.72 2.7V9z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checklist-container">
      <header className="checklist-header">
        <div className="logo-center-container">
          <img 
            src={vowlyLogo} 
            alt="Vowly Logo" 
            className="vowly-logo-fix"
          />
        </div>
        <h1>Wedding Planning Checklist</h1>
      </header>

      <div className="user-info-container">
        {showNameInput ? (
          <div className="input-section">
            <div className="name-section">
              <label htmlFor="coupleNames" className="friendly-label">So, who's getting married? &#10084;</label>
              <form onSubmit={handleNameSubmit}>
                <div className="name-input-container">
                  <input
                    type="text"
                    id="coupleNames"
                    className="name-input"
                    value={nameInputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Taylor & Sophia"
                  />
                  <button 
                    type="submit" 
                    className="begin-button" 
                    onMouseOver={() => handleButtonHover(true)} 
                    onMouseOut={() => handleButtonHover(false)}
                  >
                    &#10084;
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="display-names">
            Planning a wedding for {coupleNames}
            <span className="edit-icon" onClick={handleEditNames}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#5a1846">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L17 2 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </span>
          </div>
        )}
        
        <div className="progress-container">
          <div className="progress-label">Your Wedding Planning Progress</div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}>
              <span className="progress-text">{calculateProgress()}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="journey-timeline">
        {checklistData.map((phase, index) => (
          <div 
            key={index} 
            className={`timeline-phase ${activePhase === index ? 'active' : ''}`}
            onClick={() => handlePhaseSelect(index)}
            style={{'--phase-color': phase.color}}
          >
            <div className="timeline-icon">
              {getPhaseIcon(phase.icon)}
            </div>
            <div className="timeline-label">{phase.phase}</div>
          </div>
        ))}
      </div>

      <div className="main-content-wrapper">
        {/* Floating Action Buttons */}
        <div className="floating-action-buttons">
          <button className="floating-button" onClick={handleSave}>
            <span className="icon">&#10084;</span>
            Save
          </button>
          <button className="floating-button" onClick={handleDownloadPDF}>
            <span className="icon">&#8595;</span>
            PDF
          </button>
        </div>
        
        {/* Phase Sidebar */}
        <div className="phase-sidebar">
          {checklistData.map((phase, index) => (
            <div 
              key={index}
              className={`sidebar-phase ${activePhase === index ? 'active' : ''}`}
              onClick={() => handlePhaseSelect(index)}
              style={{'--phase-color': phase.color}}
            >
              <div className="sidebar-phase-icon">
                {getPhaseIcon(phase.icon)}
              </div>
              <div className="sidebar-phase-content">
                <div className="sidebar-phase-title">{phase.phase}</div>
                <div className="sidebar-phase-timeframe">{phase.timeframe}</div>
                <div className="sidebar-phase-progress">
                  <div 
                    className="progress-bar" 
                    style={{width: `${calculatePhaseProgress(index)}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checklist Content Area */}
        <div className="checklist-content">
          {checklistData.map((phase, phaseIndex) => (
            <div 
              className={`checklist-section ${openSections[phaseIndex] ? 'open' : ''}`} 
              key={phaseIndex}
              id={`phase-${phaseIndex}`}
              style={{'--phase-color': phase.color}}
            >
              <div 
                className={`section-header ${openSections[phaseIndex] ? 'open' : ''}`}
                onClick={() => toggleSection(phaseIndex)}
              >
                <div className="section-header-content">
                  <div className="section-header-icon">
                    {getPhaseIcon(phase.icon)}
                  </div>
                  <div className="section-title-container">
                    <span className="section-title">{phase.phase}</span>
                    <span className="section-subtitle">{phase.timeframe}</span>
                  </div>
                </div>
                <span className="chevron"></span>
              </div>
              <div className={`section-content ${openSections[phaseIndex] ? 'open' : ''}`}>
                <ul className="task-list">
                  {phase.tasks.map((task, taskIndex) => (
                    <li 
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      key={taskIndex}
                      id={`task-${phaseIndex}-${taskIndex}`}
                      data-tooltip={task.completed ? "Completed!" : "Click to mark as completed"}
                    >
                      <label className="task-checkbox">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskToggle(phaseIndex, taskIndex)}
                        />
                        <span className="checkbox-custom"></span>
                      </label>
                      <span className="task-text">{task.text}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Vowly Pro Tip */}
                <div className="vowly-pro-tip">
                  <div className="tip-header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="tip-icon">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2zm-4-4H7v-2h2v2z"/>
                    </svg>
                    <span>Vowly Pro Tip</span>
                  </div>
                  <p>{phase.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button className="checklist-button save-button" onClick={handleSave}>
          Save Checklist
        </button>
        <button className="checklist-button download-button" onClick={handleDownloadPDF}>
          Download PDF
        </button>
        <button className="checklist-button clear-button" onClick={handleClear}>
          Clear All Data
        </button>
      </div>

      {showEmailModal && (
        <EmailCapture
          action={modalAction}
          onClose={handleCloseModal}
          coupleNames={coupleNames}
          checklistData={checklistData}
        />
      )}
    </div>
  );
};

export default Checklist;

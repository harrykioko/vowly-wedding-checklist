// This file serves as the entry point for the standalone widget version
import React from 'react';
import { createRoot } from 'react-dom/client';
import Checklist from './components/Checklist';
import './styles/standalone.css';

// This function can be called to initialize the widget on any container
export function initVowlyWidget(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found`);
    return;
  }
  
  const root = createRoot(container);
  root.render(<Checklist />);
  
  // Setup responsive height handling
  setupHeightObserver(container);
  
  return {
    destroy: () => {
      root.unmount();
    }
  };
}

// Setup observer to handle responsive height
function setupHeightObserver(container) {
  // Create a resize observer to handle height changes
  const resizeObserver = new ResizeObserver(() => {
    notifyParentOfHeight(container.offsetHeight);
  });
  
  // Start observing the container
  resizeObserver.observe(container);
  
  // Also observe when DOM content changes
  const mutationObserver = new MutationObserver(() => {
    notifyParentOfHeight(container.offsetHeight);
  });
  
  mutationObserver.observe(container, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  });
}

// Send height to parent window if in iframe
function notifyParentOfHeight(height) {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ 
      type: 'vowly-height', 
      height: height 
    }, '*');
  }
}

// Auto-initialize if the script is loaded directly
if (typeof window !== 'undefined') {
  window.VowlyWidget = {
    init: initVowlyWidget
  };
  
  // Auto-initialize if vowly-container exists
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('vowly-container');
    if (container) {
      initVowlyWidget('vowly-container');
    }
  });
}

export default Checklist;

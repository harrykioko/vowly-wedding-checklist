/**
 * Vowly Wedding Checklist Integration Examples
 * 
 * This file contains examples of how to integrate the Vowly Wedding Checklist
 * into marketing websites and partner platforms.
 */

/**
 * Basic iFrame integration
 * Simply include this script and add a div with id="vowly-checklist-container"
 */
function initVowlyChecklist() {
  const container = document.getElementById('vowly-checklist-container');
  if (!container) return;
  
  const iframe = document.createElement('iframe');
  iframe.src = 'https://app.vowly.wedding/checklist';
  iframe.width = '100%';
  iframe.height = '800px';
  iframe.frameBorder = '0';
  iframe.scrolling = 'yes';
  iframe.allow = 'fullscreen';
  iframe.title = 'Vowly Wedding Checklist';
  
  container.appendChild(iframe);
}

/**
 * Responsive iFrame that adjusts height based on content
 * Requires communication between parent site and iframe
 */
function initResponsiveVowlyChecklist() {
  const container = document.getElementById('vowly-checklist-container');
  if (!container) return;
  
  const iframe = document.createElement('iframe');
  iframe.src = 'https://app.vowly.wedding/checklist?embed=true';
  iframe.width = '100%';
  iframe.height = '800px'; // Initial height
  iframe.frameBorder = '0';
  iframe.scrolling = 'no'; // No scrollbar in iframe
  iframe.style.overflow = 'hidden';
  iframe.title = 'Vowly Wedding Checklist';
  
  container.appendChild(iframe);
  
  // Listen for messages from the iframe to adjust height
  window.addEventListener('message', function(event) {
    if (event.origin !== 'https://app.vowly.wedding') return;
    
    if (event.data.type === 'vowly-height') {
      iframe.height = event.data.height + 20 + 'px'; // Add padding
    }
  });
}

/**
 * Popup modal integration
 * Add a button with id="vowly-checklist-button" to trigger the modal
 */
function initVowlyChecklistModal() {
  const button = document.getElementById('vowly-checklist-button');
  if (!button) return;
  
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'vowly-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.zIndex = '1000';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.overflow = 'auto';
  modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'vowly-modal-content';
  modalContent.style.backgroundColor = '#fff';
  modalContent.style.margin = '5% auto';
  modalContent.style.padding = '20px';
  modalContent.style.border = '1px solid #888';
  modalContent.style.width = '90%';
  modalContent.style.maxWidth = '1000px';
  modalContent.style.borderRadius = '8px';
  modalContent.style.position = 'relative';
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'vowly-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.style.color = '#aaa';
  closeBtn.style.float = 'right';
  closeBtn.style.fontSize = '28px';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.cursor = 'pointer';
  
  const iframe = document.createElement('iframe');
  iframe.src = 'https://app.vowly.wedding/checklist?embed=true';
  iframe.width = '100%';
  iframe.height = '80vh';
  iframe.frameBorder = '0';
  iframe.scrolling = 'yes';
  iframe.allow = 'fullscreen';
  iframe.title = 'Vowly Wedding Checklist';
  
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(iframe);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // Event listeners
  button.addEventListener('click', function() {
    modal.style.display = 'block';
  });
  
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

/**
 * Load checklist data via API for custom display
 * Requires API key
 */
async function loadVowlyChecklistData(apiKey) {
  try {
    const response = await fetch('https://api.vowly.wedding/v1/checklist', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to load checklist data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading Vowly checklist data:', error);
    return null;
  }
}

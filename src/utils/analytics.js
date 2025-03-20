/**
 * Analytics module for tracking user interactions with the wedding checklist
 * This module provides a facade for different analytics platforms
 * Currently configured for Google Analytics and PostHog
 */

// Track events in Google Analytics
const trackGoogleAnalytics = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('GA event tracked:', eventName, eventParams);
  } else {
    console.log('Google Analytics not available - would track:', eventName, eventParams);
  }
};

// Track events in PostHog
const trackPostHog = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, eventParams);
    console.log('PostHog event tracked:', eventName, eventParams);
  } else {
    console.log('PostHog not available - would track:', eventName, eventParams);
  }
};

// Initialize analytics (should be called once when the app loads)
export const initAnalytics = () => {
  console.log('Analytics initialized');
  
  // In a real implementation, you would initialize Google Analytics and PostHog here
  // For development purposes, we'll create mock objects
  if (typeof window !== 'undefined' && !window.gtag) {
    window.gtag = function(...args) {
      console.log('Mock GA call:', args);
    };
  }
  
  if (typeof window !== 'undefined' && !window.posthog) {
    window.posthog = {
      capture: function(event, properties) {
        console.log('Mock PostHog call:', event, properties);
      }
    };
  }
};

// Track a user action across all analytics platforms
export const trackEvent = (eventName, eventParams = {}) => {
  // Add timestamp
  const paramsWithTimestamp = {
    ...eventParams,
    timestamp: new Date().toISOString()
  };
  
  // Track in all platforms
  trackGoogleAnalytics(eventName, paramsWithTimestamp);
  trackPostHog(eventName, paramsWithTimestamp);
};

// Predefined events for common user actions
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  TASK_COMPLETE: 'task_complete',
  TASK_UNCOMPLETE: 'task_uncomplete',
  SECTION_TOGGLE: 'section_toggle',
  SAVE_CHECKLIST: 'save_checklist',
  DOWNLOAD_PDF: 'download_pdf',
  EMAIL_CAPTURE: 'email_capture',
  EMAIL_SUBMIT: 'email_submit',
  CLEAR_DATA: 'clear_data',
  PERSONALIZATION_UPDATE: 'personalization_update'
};

// Helper for tracking page views
export const trackPageView = (pageName) => {
  trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, { page_name: pageName });
};

// Helper for tracking task completions
export const trackTaskComplete = (taskId, taskText, monthSection) => {
  trackEvent(ANALYTICS_EVENTS.TASK_COMPLETE, {
    task_id: taskId,
    task_text: taskText,
    month_section: monthSection
  });
};

// Helper for tracking task un-completions
export const trackTaskUncomplete = (taskId, taskText, monthSection) => {
  trackEvent(ANALYTICS_EVENTS.TASK_UNCOMPLETE, {
    task_id: taskId,
    task_text: taskText,
    month_section: monthSection
  });
};

// Helper for tracking section toggles
export const trackSectionToggle = (monthSection, isExpanded) => {
  trackEvent(ANALYTICS_EVENTS.SECTION_TOGGLE, {
    month_section: monthSection,
    is_expanded: isExpanded
  });
};

// Helper for tracking checklist saves
export const trackSaveChecklist = (taskCompletionCount, totalTasks) => {
  trackEvent(ANALYTICS_EVENTS.SAVE_CHECKLIST, {
    completion_percentage: Math.round((taskCompletionCount / totalTasks) * 100),
    task_completion_count: taskCompletionCount,
    total_tasks: totalTasks
  });
};

// Helper for tracking PDF downloads
export const trackPDFDownload = (taskCompletionCount, totalTasks) => {
  trackEvent(ANALYTICS_EVENTS.DOWNLOAD_PDF, {
    completion_percentage: Math.round((taskCompletionCount / totalTasks) * 100),
    task_completion_count: taskCompletionCount,
    total_tasks: totalTasks
  });
};

// Helper for tracking email captures
export const trackEmailCapture = (hasName = false) => {
  trackEvent(ANALYTICS_EVENTS.EMAIL_CAPTURE, {
    has_name: hasName
  });
};

// Helper for tracking email submissions
export const trackEmailSubmit = (hasName = false) => {
  trackEvent(ANALYTICS_EVENTS.EMAIL_SUBMIT, {
    has_name: hasName
  });
};

// Helper for tracking data clearing
export const trackClearData = (taskCompletionCount, totalTasks) => {
  trackEvent(ANALYTICS_EVENTS.CLEAR_DATA, {
    completion_percentage: Math.round((taskCompletionCount / totalTasks) * 100),
    task_completion_count: taskCompletionCount,
    total_tasks: totalTasks
  });
};

// Helper for tracking personalization updates
export const trackPersonalizationUpdate = (hasCoupleName, hasWeddingDate) => {
  trackEvent(ANALYTICS_EVENTS.PERSONALIZATION_UPDATE, {
    has_couple_name: hasCoupleName,
    has_wedding_date: hasWeddingDate
  });
};

/**
 * Utility functions for managing local storage
 */

// Key for storing checklist data in local storage
const STORAGE_KEY = 'vowly_wedding_checklist_data';

/**
 * Save checklist data to local storage
 * @param {Object} data - Checklist data including tasks, personalization, etc.
 */
export const saveChecklistData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving checklist data to local storage:', error);
    return false;
  }
};

/**
 * Load checklist data from local storage
 * @returns {Object|null} Checklist data or null if no data exists
 */
export const loadChecklistData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading checklist data from local storage:', error);
    return null;
  }
};

/**
 * Clear all checklist data from local storage
 */
export const clearChecklistData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing checklist data from local storage:', error);
    return false;
  }
};

/**
 * Check if local storage is available in the browser
 * @returns {boolean} - Whether local storage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

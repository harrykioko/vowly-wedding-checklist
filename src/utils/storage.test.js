import { saveChecklistData, loadChecklistData, clearChecklistData, isStorageAvailable } from './storage';

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

describe('Storage Utility', () => {
  const STORAGE_KEY = 'vowly_wedding_checklist_data';
  const mockData = {
    coupleNames: 'Alex & Jordan',
    weddingDate: '2025-06-15',
    checklistData: [
      {
        month: '12+ Months Before',
        tasks: [
          { id: '12-1', text: 'Set a budget', completed: true },
        ],
      },
    ],
  };

  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('saveChecklistData saves data to localStorage', () => {
    const result = saveChecklistData(mockData);
    
    expect(result).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify(mockData)
    );
  });

  test('loadChecklistData loads data from localStorage', () => {
    // Setup: Store some data first
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(mockData));
    
    const result = loadChecklistData();
    
    expect(result).toEqual(mockData);
    expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  test('loadChecklistData returns null if no data exists', () => {
    // No setup - localStorage is empty
    
    const result = loadChecklistData();
    
    expect(result).toBeNull();
    expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  test('clearChecklistData removes data from localStorage', () => {
    // Setup: Store some data first
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(mockData));
    
    const result = clearChecklistData();
    
    expect(result).toBe(true);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  test('isStorageAvailable returns true if localStorage is available', () => {
    const result = isStorageAvailable();
    
    expect(result).toBe(true);
  });

  test('isStorageAvailable returns false if localStorage throws an error', () => {
    // Mock localStorage.setItem to throw an error
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Storage is not available');
    });
    
    const result = isStorageAvailable();
    
    expect(result).toBe(false);
  });

  test('saveChecklistData handles errors', () => {
    // Mock console.error to prevent test output pollution
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock localStorage.setItem to throw an error
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Storage quota exceeded');
    });
    
    const result = saveChecklistData(mockData);
    
    expect(result).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error saving checklist data to local storage:',
      expect.any(Error)
    );
    
    consoleErrorSpy.mockRestore();
  });

  test('loadChecklistData handles parsing errors', () => {
    // Mock console.error to prevent test output pollution
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Setup invalid JSON in localStorage
    localStorageMock.getItem.mockReturnValueOnce('{invalid-json}');
    
    const result = loadChecklistData();
    
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error loading checklist data from local storage:',
      expect.any(Error)
    );
    
    consoleErrorSpy.mockRestore();
  });
});

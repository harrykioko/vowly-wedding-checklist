import { generateWeddingChecklistPDF, downloadWeddingChecklistPDF } from './pdfGenerator';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// Mock jsPDF and QRCode
jest.mock('jspdf', () => {
  const mockJsPDFInstance = {
    setFillColor: jest.fn(),
    setTextColor: jest.fn(),
    setFontSize: jest.fn(),
    setFont: jest.fn(),
    text: jest.fn(),
    rect: jest.fn(),
    addImage: jest.fn(),
    line: jest.fn(),
    setLineWidth: jest.fn(),
    setDrawColor: jest.fn(),
    addPage: jest.fn(),
    setPage: jest.fn(),
    output: jest.fn().mockReturnValue(new Blob(['pdf content'])),
    internal: {
      getNumberOfPages: jest.fn().mockReturnValue(2),
      pageSize: {
        getWidth: jest.fn().mockReturnValue(210),
        getHeight: jest.fn().mockReturnValue(297)
      }
    },
    saveGraphicsState: jest.fn(),
    restoreGraphicsState: jest.fn(),
    setGState: jest.fn(),
    GState: function() { return {}; }
  };
  
  return {
    jsPDF: jest.fn().mockImplementation(() => mockJsPDFInstance)
  };
});

jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,mockedQRCode')
}));

// Mock URL and document APIs
global.URL.createObjectURL = jest.fn().mockReturnValue('blob:mockurl');
global.URL.revokeObjectURL = jest.fn();

describe('PDF Generator', () => {
  let mockData;
  let appendChildSpy;
  let removeChildSpy;
  let createElementSpy;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock document methods
    appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => {});
    createElementSpy = jest.spyOn(document, 'createElement').mockImplementation(() => ({
      href: '',
      download: '',
      click: jest.fn()
    }));
    
    // Sample checklist data for testing
    mockData = {
      coupleNames: 'Alex & Jordan',
      weddingDate: '2025-06-15',
      checklistData: [
        {
          month: '12+ Months Before',
          isCollapsed: false,
          tasks: [
            { id: '12-1', text: 'Set a budget', completed: true },
            { id: '12-2', text: 'Create a guest list', completed: false }
          ]
        },
        {
          month: '9-11 Months Before',
          isCollapsed: true,
          tasks: [
            { id: '9-1', text: 'Shop for wedding attire', completed: false }
          ]
        }
      ]
    };
  });
  
  afterEach(() => {
    // Restore spies
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    createElementSpy.mockRestore();
  });

  test('generateWeddingChecklistPDF creates a PDF blob', async () => {
    const result = await generateWeddingChecklistPDF(mockData);
    
    // Check if the PDF was created
    expect(result).toBeInstanceOf(Blob);
    
    // Verify that jsPDF constructor was called
    expect(jsPDF).toHaveBeenCalled();
    
    // Verify that QR code was generated
    expect(QRCode.toDataURL).toHaveBeenCalledWith('https://vowly.wedding', expect.any(Object));
  });

  test('downloadWeddingChecklistPDF triggers file download', async () => {
    await downloadWeddingChecklistPDF(mockData);
    
    // Verify that a link element was created
    expect(createElementSpy).toHaveBeenCalledWith('a');
    
    // Verify that the link was appended to the document
    expect(appendChildSpy).toHaveBeenCalled();
    
    // Verify that URL.createObjectURL was called with a Blob
    expect(URL.createObjectURL).toHaveBeenCalled();
    
    // Verify URL cleanup
    jest.advanceTimersByTime(100);
    expect(URL.revokeObjectURL).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  test('handles errors in downloadWeddingChecklistPDF', async () => {
    // Mock console.error to prevent test output pollution
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Force generateWeddingChecklistPDF to throw an error
    const mockError = new Error('PDF generation failed');
    jest.spyOn(global, 'generateWeddingChecklistPDF').mockRejectedValueOnce(mockError);
    
    const result = await downloadWeddingChecklistPDF(mockData);
    
    // Should return false on error
    expect(result).toBe(false);
    
    // Should log the error
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating PDF:', mockError);
    
    consoleErrorSpy.mockRestore();
  });
});

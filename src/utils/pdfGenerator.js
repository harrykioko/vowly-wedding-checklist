import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// Helper function to generate QR code as data URL
const generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text, {
      width: 100,
      margin: 1,
      color: {
        dark: '#5d0734', // Vowly primary color (maroon)
        light: '#ffffff', // White background
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

// Helper to add watermark to the document
const addWatermark = (doc, text) => {
  const pageCount = doc.internal.getNumberOfPages();
  doc.setTextColor(230, 230, 230); // Light gray
  doc.setFontSize(60);
  doc.setFont('helvetica', 'italic');
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.text(text, pageWidth / 2, pageHeight / 2, {
      align: 'center',
      angle: 45,
    });
    doc.restoreGraphicsState();
  }
};

// Function to format date as a readable string
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Generates a PDF document from wedding checklist data
 * @param {Array} checklistData - Checklist data with task information
 * @param {string} coupleNames - Names of the couple
 * @param {string} weddingDate - Wedding date
 * @param {string} email - User's email address
 * @param {string} name - User's name
 * @returns {Promise<Blob>} - PDF document as Blob
 */
export const generateWeddingChecklistPDF = async (checklistData, coupleNames, weddingDate, email, name) => {
  const doc = new jsPDF();
  
  // Define Vowly brand colors
  const vowlyPrimary = [93, 7, 52]; // RGB for #5d0734 (maroon)
  const vowlySecondary = [255, 204, 230]; // RGB for #ffcce6 (pink)
  const vowlyNavy = [42, 43, 95]; // RGB for #2a2b5f (navy)
  
  // Generate QR code pointing to Vowly website
  const qrCodeDataUrl = await generateQRCode('https://vowly.wedding');
  
  // Add header with branding
  doc.setFillColor(...vowlyPrimary);
  doc.rect(0, 0, 210, 25, 'F');
  
  // Add navy accent line
  doc.setFillColor(...vowlyNavy);
  doc.rect(0, 25, 210, 3, 'F');
  
  // Add title
  doc.setTextColor(255, 255, 255); // White
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Wedding Planning Checklist', 105, 15, { align: 'center' });
  
  // Add couple information
  const formattedWeddingDate = formatDate(weddingDate);
  doc.setTextColor(0, 0, 0); // Black
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  
  let yPos = 40;
  if (coupleNames) {
    doc.text(`Couple: ${coupleNames}`, 20, yPos);
    yPos += 10;
  }
  
  if (formattedWeddingDate) {
    doc.text(`Wedding Date: ${formattedWeddingDate}`, 20, yPos);
    yPos += 10;
  }
  
  // Add user information if provided
  if (name) {
    doc.text(`Created for: ${name}`, 20, yPos);
    yPos += 10;
  }
  
  if (email) {
    doc.text(`Email: ${email}`, 20, yPos);
    yPos += 10;
  }
  
  // Add QR code
  if (qrCodeDataUrl) {
    doc.addImage(qrCodeDataUrl, 'PNG', 150, 35, 30, 30);
    doc.setFontSize(8);
    doc.setTextColor(...vowlySecondary);
    doc.text('Scan to visit Vowly', 165, 70, { align: 'center' });
  }
  
  // Add watermark
  addWatermark(doc, 'Vowly');
  
  // Add subtle marketing note
  doc.setFontSize(9);
  doc.setTextColor(...vowlyPrimary);
  doc.text('Powered by Vowly - Your Complete Wedding Planning Solution', 105, 90, { align: 'center' });
  
  // Add separator
  doc.setDrawColor(...vowlySecondary);
  doc.setLineWidth(0.5);
  doc.line(20, 95, 190, 95);
  
  yPos = 105;
  
  // Add checklist content
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  
  checklistData.forEach((month) => {
    // Add month header
    doc.setFillColor(...vowlySecondary);
    doc.rect(20, yPos - 6, 170, 8, 'F');
    doc.setTextColor(...vowlyPrimary);
    doc.setFont('helvetica', 'bold');
    doc.text(month.month, 25, yPos);
    yPos += 8;
    
    // Add tasks
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    month.tasks.forEach((task) => {
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      // Draw checkbox
      if (task.completed) {
        doc.setFillColor(...vowlyPrimary);
        doc.rect(25, yPos - 4, 4, 4, 'F');
      } else {
        doc.setDrawColor(...vowlyPrimary);
        doc.rect(25, yPos - 4, 4, 4, 'S');
      }
      
      // Task text
      if (task.completed) {
        doc.setTextColor(150, 150, 150); // Gray for completed tasks
      } else {
        doc.setTextColor(0, 0, 0); // Black for uncompleted tasks
      }
      doc.text(task.text, 35, yPos);
      yPos += 8;
    });
    
    yPos += 5; // Add some space after each month section
  });
  
  // Add footer on each page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} | Created with Vowly Wedding Planning Tools`,
      105,
      285,
      { align: 'center' }
    );
  }
  
  // Return the PDF as a blob
  return doc.output('blob');
};

/**
 * Generates and downloads the wedding checklist PDF
 * @param {Array} checklistData - Checklist data with task information
 * @param {string} coupleNames - Names of the couple
 * @param {string} weddingDate - Wedding date
 * @param {string} email - User's email address for tracking
 * @param {string} name - User's name for personalization
 * @returns {Promise<boolean>} - Whether the download was successful
 */
export const downloadWeddingChecklistPDF = async (checklistData, coupleNames, weddingDate, email, name) => {
  try {
    const pdf = await generateWeddingChecklistPDF(checklistData, coupleNames, weddingDate, email, name);
    const url = URL.createObjectURL(pdf);
    
    // Create link element to trigger download
    const link = document.createElement('a');
    const filenameCoupleNames = coupleNames ? coupleNames.replace(/\s+/g, '_') : 'Wedding';
    link.href = url;
    link.download = `${filenameCoupleNames}_Wedding_Checklist.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);
    
    // Also send PDF to user's email if set up with backend
    if (email) {
      console.log(`PDF would be sent to ${email} for ${name || 'customer'}`);
      // In a real implementation, trigger API call to send the PDF via email
    }
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

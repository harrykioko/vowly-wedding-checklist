/**
 * This script prepares a standalone version of the Vowly Wedding Checklist
 * that can be embedded into other websites as a widget.
 */

const fs = require('fs');
const path = require('path');

// Create the dist directory for the standalone version
const buildDir = path.resolve(__dirname, '../build');
const distDir = path.resolve(__dirname, '../dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy the build files to dist
console.log('Copying build files to dist directory...');
copyFolderSync(buildDir, distDir);

// Modify the index.html to make it embeddable
console.log('Customizing standalone files...');
const indexHtmlPath = path.join(distDir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Update the HTML to work as an embeddable widget
indexHtml = indexHtml.replace(
  '<html lang="en">',
  '<html lang="en" class="vowly-widget">'
);

// Add script for responsive iframe communication
const iframeScript = `
<script>
  // Communicate height changes to parent window
  function updateParentHeight() {
    const height = document.body.scrollHeight;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ 
        type: 'vowly-height', 
        height: height 
      }, '*');
    }
  }
  
  // Update on resize and mutation
  window.addEventListener('resize', updateParentHeight);
  
  // Initialize MutationObserver to detect DOM changes
  const observer = new MutationObserver(updateParentHeight);
  
  // Start observing when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    
    // Initial height update
    updateParentHeight();
  });
</script>
`;

// Insert before closing head tag
indexHtml = indexHtml.replace('</head>', `${iframeScript}</head>`);

// Add wrapper div for isolation
indexHtml = indexHtml.replace(
  '<div id="root"></div>',
  '<div id="root" class="vowly-widget-container"></div>'
);

// Write modified HTML back to file
fs.writeFileSync(indexHtmlPath, indexHtml);

// Create embed code example
console.log('Creating embed code example...');
const embedCodePath = path.join(distDir, 'embed-code.html');
const embedCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vowly Wedding Checklist - Embed Code Example</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      overflow: auto;
    }
    .example-container {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    h1, h2 {
      color: #ff6b6b;
    }
    .note {
      background-color: #fff3cd;
      border-left: 4px solid #ffeeba;
      padding: 10px 15px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>Vowly Wedding Checklist - Integration Guide</h1>
  
  <h2>Standard Iframe Integration</h2>
  <p>Copy and paste this code into your website to embed the Vowly Wedding Checklist:</p>
  <pre>&lt;iframe 
  src="${window.location.origin}/index.html" 
  style="width: 100%; border: none; min-height: 700px;" 
  id="vowly-checklist-frame"
  title="Vowly Wedding Checklist"
&gt;&lt;/iframe&gt;

&lt;script&gt;
  // Handle height adjustments from the iframe
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'vowly-height') {
      const iframe = document.getElementById('vowly-checklist-frame');
      if (iframe) {
        iframe.style.height = (event.data.height + 20) + 'px';
      }
    }
  });
&lt;/script&gt;</pre>

  <h2>JavaScript API Integration</h2>
  <p>For more control, you can use our JavaScript API:</p>
  <pre>&lt;!-- 1. Add container where you want the checklist to appear --&gt;
&lt;div id="vowly-container"&gt;&lt;/div&gt;

&lt;!-- 2. Include the Vowly script --&gt;
&lt;script src="${window.location.origin}/static/js/main.js"&gt;&lt;/script&gt;

&lt;!-- 3. Initialize the widget --&gt;
&lt;script&gt;
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the widget
    window.VowlyWidget.init('vowly-container');
  });
&lt;/script&gt;</pre>

  <div class="note">
    <strong>Note:</strong> For production use, we recommend downloading the files and hosting them on your own server for better reliability.
  </div>

  <h2>Integration Example</h2>
  <div class="example-container">
    <iframe 
      src="./index.html" 
      style="width: 100%; border: none; min-height: 700px;" 
      id="vowly-example-frame"
      title="Vowly Wedding Checklist Example"
    ></iframe>

    <script>
      // Handle height adjustments from the iframe
      window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'vowly-height') {
          const iframe = document.getElementById('vowly-example-frame');
          if (iframe) {
            iframe.style.height = (event.data.height + 20) + 'px';
          }
        }
      });
    </script>
  </div>

  <h2>CSS Customization</h2>
  <p>You can customize the appearance of the widget by overriding our CSS variables:</p>
  <pre>&lt;style&gt;
  #vowly-container {
    --vowly-primary: #ff6b6b;    /* Primary color */
    --vowly-secondary: #4ecdc4;  /* Secondary color */
    --vowly-accent: #ffe66d;     /* Accent color */
    --vowly-text: #2b2b2b;       /* Text color */
    --vowly-background: #ffffff; /* Background color */
  }
&lt;/style&gt;</pre>
</body>
</html>`;

fs.writeFileSync(embedCodePath, embedCode);

// Create a minified version of the build for faster loading
console.log('Creating optimized version for embedding...');
// TODO: Add minification steps for better performance

console.log('Standalone version created successfully!');

// Utility function to copy folders recursively
function copyFolderSync(source, target) {
  // Create target folder if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  // Read all files in source folder
  const files = fs.readdirSync(source);

  // Copy each file/folder
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    // Get file stats
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // Recursively copy subdirectories
      copyFolderSync(sourcePath, targetPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

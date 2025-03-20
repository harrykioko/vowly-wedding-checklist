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
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true 
    });
    updateParentHeight();
  });
</script>`;

// Insert the script before the closing </head> tag
indexHtml = indexHtml.replace('</head>', iframeScript + '</head>');

// Add stylesheet for widget mode
const widgetCss = `
<style>
  /* Styles for when used as a widget */
  .vowly-widget {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  .vowly-widget body {
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
  }
</style>`;

// Insert the CSS before the closing </head> tag
indexHtml = indexHtml.replace('</head>', widgetCss + '</head>');

// Write the modified HTML back to disk
fs.writeFileSync(indexHtmlPath, indexHtml);

// Create a sample embed code file
const embedCodePath = path.join(distDir, 'embed-code.html');
const embedCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vowly Wedding Checklist - Embed Example</title>
  <style>
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: sans-serif;
    }
    .code-block {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      margin: 20px 0;
      overflow-x: auto;
    }
    h2 {
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Vowly Wedding Checklist - Embedding Guide</h1>
    <p>
      This file provides examples of how to embed the Vowly Wedding Checklist into your website.
    </p>
    
    <h2>Basic iFrame Embedding</h2>
    <div class="code-block">
      <pre><code>&lt;iframe 
  src="https://your-website.com/path/to/standalone/index.html"
  width="100%"
  height="800px"
  frameborder="0"
  title="Vowly Wedding Checklist"
&gt;&lt;/iframe&gt;</code></pre>
    </div>
    
    <h2>Responsive iFrame</h2>
    <p>
      For a responsive iframe that adjusts its height based on content:
    </p>
    <div class="code-block">
      <pre><code>&lt;iframe 
  id="vowly-iframe"
  src="https://your-website.com/path/to/standalone/index.html"
  width="100%"
  height="800px"
  frameborder="0"
  scrolling="no"
  style="overflow: hidden;"
  title="Vowly Wedding Checklist"
&gt;&lt;/iframe&gt;

&lt;script&gt;
  window.addEventListener('message', function(event) {
    // Verify the origin - replace with your actual domain
    if (event.origin !== 'https://your-website.com') return;
    
    if (event.data.type === 'vowly-height') {
      const iframe = document.getElementById('vowly-iframe');
      if (iframe) {
        iframe.height = event.data.height + 20 + 'px';
      }
    }
  });
&lt;/script&gt;</code></pre>
    </div>
    
    <h2>Pop-up Modal Implementation</h2>
    <p>
      To display the checklist in a pop-up modal:
    </p>
    <div class="code-block">
      <pre><code>&lt;button id="open-vowly"&gt;Open Wedding Checklist&lt;/button&gt;

&lt;div id="vowly-modal" style="display: none; position: fixed; z-index: 1000; 
  left: 0; top: 0; width: 100%; height: 100%; overflow: auto; 
  background-color: rgba(0,0,0,0.4);"&gt;
  &lt;div style="background-color: #fff; margin: 5% auto; padding: 20px; 
    border: 1px solid #888; width: 90%; max-width: 1000px; position: relative;"&gt;
    &lt;span id="close-vowly" style="color: #aaa; float: right; font-size: 28px; 
      font-weight: bold; cursor: pointer;"&gt;&times;&lt;/span&gt;
    &lt;iframe src="https://your-website.com/path/to/standalone/index.html" 
      width="100%" height="80vh" frameborder="0" title="Vowly Wedding Checklist"&gt;&lt;/iframe&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
  document.getElementById('open-vowly').onclick = function() {
    document.getElementById('vowly-modal').style.display = 'block';
  }
  
  document.getElementById('close-vowly').onclick = function() {
    document.getElementById('vowly-modal').style.display = 'none';
  }
  
  window.onclick = function(event) {
    if (event.target === document.getElementById('vowly-modal')) {
      document.getElementById('vowly-modal').style.display = 'none';
    }
  }
&lt;/script&gt;</code></pre>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(embedCodePath, embedCode);

console.log('Standalone version created successfully!');
console.log(`Files are available in the "${distDir}" directory.`);
console.log('Embed examples are available in embed-code.html');

/**
 * Recursively copy files from source to destination
 */
function copyFolderSync(src, dest) {
  // Create destination folder if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      // If directory, recursively copy
      copyFolderSync(srcPath, destPath);
    } else {
      // If file, copy it
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

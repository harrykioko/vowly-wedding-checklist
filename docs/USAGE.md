# Vowly Wedding Checklist - Usage Guide

This document provides detailed instructions for the marketing team on how to integrate, customize, and maintain the Vowly Wedding Checklist component on the Vowly marketing website.

## Table of Contents

1. [Integration](#integration)
2. [Customization](#customization)
3. [Content Updates](#content-updates)
4. [Analytics](#analytics)
5. [Troubleshooting](#troubleshooting)

## Integration

### Embedding the Checklist

The Vowly Wedding Checklist is designed to be easily embedded into any page on the Vowly marketing website. 

```html
<!-- Step 1: Add the container where the checklist will be mounted -->
<div id="vowly-checklist-container"></div>

<!-- Step 2: Include the compiled JavaScript bundle -->
<script src="path/to/vowly-checklist/build/static/js/main.[hash].js"></script>

<!-- Step 3: Initialize the checklist -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the checklist in the container
    VowlyChecklist.init('vowly-checklist-container');
  });
</script>
```

### Responsive Behavior

The checklist is fully responsive and will adapt to the container width. For optimal user experience:

- **Desktop**: Container width of at least 800px is recommended
- **Tablet**: Works well at 600px+
- **Mobile**: Minimum width of 320px is supported

## Customization

### Brand Colors

The checklist uses Vowly's brand colors by default:

- Primary: `#8a4fff` (Purple)
- Secondary: `#c4a6ff` (Lavender)
- Accent: `#d4af37` (Gold)
- Background: `#ffffff` (White)

To update these colors, modify the CSS variables in your site's stylesheet:

```css
:root {
  --vowly-primary: #8a4fff;
  --vowly-secondary: #c4a6ff;
  --vowly-gold: #d4af37;
  --vowly-white: #ffffff;
}
```

### Fonts

The checklist inherits fonts from your website. No additional configuration is needed.

### Layout Options

You can customize the layout by adding CSS classes to the container:

```html
<!-- For a compact layout -->
<div id="vowly-checklist-container" class="vowly-compact"></div>

<!-- For a wider layout -->
<div id="vowly-checklist-container" class="vowly-wide"></div>

<!-- For a bordered layout -->
<div id="vowly-checklist-container" class="vowly-bordered"></div>
```

## Content Updates

### Modifying Checklist Items

To update the content of the checklist (adding, removing, or modifying tasks), edit the following file:

```
src/components/Checklist.js
```

Look for the `checklistData` array, which contains all the months and tasks. Each month has the following structure:

```javascript
{
  month: '12+ Months Before',
  isCollapsed: false,
  tasks: [
    { id: '12-1', text: 'Set a budget', completed: false },
    { id: '12-2', text: 'Create a guest list', completed: false },
    // More tasks...
  ],
}
```

Important notes when editing:

1. Ensure each task has a unique `id`
2. After editing, rebuild the project with `npm run build`
3. Replace the JavaScript bundle in your deployment

### Timeframes

You can modify the timeframes (months) by changing the `month` property of each section. The default structure follows a wedding planning timeline from 12+ months before to the wedding day.

## Analytics

The checklist includes built-in analytics tracking for key user interactions:

### Tracked Events

1. **Task Completion**: When a user checks/unchecks a task
2. **Section Toggle**: When a user expands/collapses a month section
3. **PDF Download**: When a user generates and downloads the PDF
4. **Email Submission**: When a user submits their email
5. **Data Clearing**: When a user clears their saved data

### Accessing Analytics Data

Analytics events are tracked through:

1. **Google Analytics**: Events appear under Event Category "Vowly Checklist"
2. **PostHog**: Events are prefixed with "vowly_checklist_"

You can create custom reports in these platforms to monitor engagement with the checklist.

## Troubleshooting

### Common Issues

1. **Checklist Not Loading**
   - Verify the correct script is included
   - Check browser console for errors
   - Ensure the container ID matches the initialization code

2. **PDF Generation Fails**
   - Check browser console for errors
   - Ensure the user has allowed pop-ups for PDF downloads

3. **Email Capture Not Working**
   - Verify the SendGrid API key is properly configured
   - Check network requests in the browser developer tools

### Support Contacts

For technical assistance, contact:
- Development Team: [dev@vowly.wedding](mailto:dev@vowly.wedding)
- IT Support: [support@vowly.wedding](mailto:support@vowly.wedding)

---

Last Updated: March 13, 2025

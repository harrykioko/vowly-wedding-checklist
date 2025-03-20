# Vowly Wedding Checklist - Deployment Guide

This document provides instructions for deploying the Vowly Wedding Checklist component to production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Process](#build-process)
3. [Deployment Options](#deployment-options)
4. [Verification Process](#verification-process)
5. [Rollback Procedure](#rollback-procedure)

## Prerequisites

Before deploying, ensure you have:

- Node.js v14+ and npm v6+
- Access to the production hosting environment
- Proper environment configuration

## Build Process

### 1. Create a Production Build

```bash
# Install dependencies (if not already installed)
npm install

# Create optimized production build
npm run build
```

This will generate a `build` directory containing all static assets required for deployment.

### 2. Test the Production Build Locally

```bash
# Install serve globally (if not already installed)
npm install -g serve

# Serve the production build
serve -s build
```

Visit http://localhost:3000 to verify the build runs correctly.

## Deployment Options

### Option 1: Static Hosting / CDN

1. Upload the contents of the `build` directory to your static hosting service or CDN
2. Ensure proper cache configuration for static assets
3. Configure any required redirects for single-page application support

### Option 2: Embedding in Vowly Marketing Site

1. Copy the main JavaScript bundle from `build/static/js/main.[hash].js` to your website's assets
2. Include the script in your marketing site pages
3. Add the mounting container and initialization code (see USAGE.md for details)

### Option 3: Docker Deployment

```bash
# Build Docker image
docker build -t vowly/wedding-checklist .

# Run container
docker run -p 80:80 vowly/wedding-checklist
```

## Verification Process

After deployment, verify the following:

### Functionality Checklist

- [ ] Checklist items can be checked and unchecked
- [ ] Section collapsing/expanding works
- [ ] Local storage persistence functions correctly
- [ ] PDF generation produces a properly formatted document
- [ ] Email capture modal appears and submits data
- [ ] All styling and branding elements render correctly
- [ ] Analytics events fire correctly when expected

### Browser Compatibility

Test on the following browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari and Chrome

### Performance Metrics

Use Chrome DevTools Lighthouse to verify:

- Performance score > 90
- Core Web Vitals within acceptable ranges
- Mobile responsiveness

## Rollback Procedure

If issues occur after deployment:

1. Identify the nature of the issue
2. If critical, immediately revert to the previous version
3. For static deployments, re-upload the previous build
4. For embedded deployments, revert to the previous script version
5. Document the issue and steps taken to resolve

## Post-Deployment Monitoring

Monitor the following after deployment:

- Error rates in browser consoles
- User engagement metrics
- PDF download success rate
- Email submission success rate

---

For assistance with deployment issues, contact the development team at dev@vowly.wedding.

Last Updated: March 13, 2025

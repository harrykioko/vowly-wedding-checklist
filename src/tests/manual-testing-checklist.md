# Manual Testing Checklist for Vowly Wedding Planning

## Functionality Testing

### Checklist Component
- [ ] Verify all month sections can be collapsed/expanded
- [ ] Verify checkbox items can be checked/unchecked
- [ ] Confirm progress bar updates correctly when tasks are completed
- [ ] Verify personalization fields (couple names, wedding date) save correctly
- [ ] Test clear data functionality and confirm it resets all fields
- [ ] Test that the checklist state persists after page refresh

### Data Persistence
- [ ] Save checklist data and refresh the page to verify it loads correctly
- [ ] Test different browsers to ensure cross-browser compatibility
- [ ] Test incognito/private browsing to verify storage warnings appear if applicable
- [ ] Test clearing browser cache to see how the app handles data restoration

### PDF Generation
- [ ] Generate PDF with various combinations of completed tasks
- [ ] Verify couple names and wedding date appear in the PDF
- [ ] Check that the PDF includes appropriate branding elements
- [ ] Verify QR code is visible and properly positioned
- [ ] Test PDF generation with long lists to ensure proper pagination
- [ ] Verify PDF download works correctly in different browsers

### Email Capture
- [ ] Test form validation for email field
- [ ] Verify error messages display correctly for invalid inputs
- [ ] Test submission with valid data and verify success message
- [ ] Check responsive behavior of the email capture modal

## Performance Testing
- [ ] Test load time of the application
- [ ] Verify smooth animations and transitions
- [ ] Test on different screen sizes and devices

## Accessibility Testing
- [ ] Verify all interactive elements are keyboard accessible
- [ ] Test with screen reader to ensure proper announcements
- [ ] Check color contrast meets WCAG 2.1 AA standards
- [ ] Verify all form elements have appropriate labels

## Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

## Mobile Testing
- [ ] Test on iOS devices
- [ ] Test on Android devices
- [ ] Verify responsive design adapts correctly to different screen sizes

## Analytics Testing
- [ ] Verify task completion events are tracked
- [ ] Verify section toggle events are tracked
- [ ] Verify PDF download events are tracked
- [ ] Verify clear data events are tracked
- [ ] Verify save events are tracked

## Integration Testing
- [ ] Test loading the app in the demo integration page
- [ ] Verify all functionality works when embedded

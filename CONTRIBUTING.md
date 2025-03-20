# Contributing to Vowly Wedding Checklist

We love your input! We want to make contributing to Vowly Wedding Checklist as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repository to your own GitHub account
2. Clone the project to your machine
3. Create a branch locally with a succinct but descriptive name
4. Commit changes to the branch
5. Push changes to your fork
6. Open a PR in our repository and follow the PR template

### Development Workflow

1. Make sure tests pass with `npm test`
2. Update documentation as needed
3. Keep PRs small and focused on a single issue or feature

## Code Style

We follow the ESLint setup defined in the project. Before submitting a PR, please ensure:

1. Your code follows our ESLint rules (`npm run lint`)
2. Tests pass (`npm test`)
3. The application builds without warnings (`npm run build`)

## Project Structure

```
vowly-wedding-checklist/
├── public/             # Static files
├── src/
│   ├── components/     # React components
│   ├── styles/         # CSS styles
│   ├── utils/          # Utility functions
│   ├── data/           # Data files (checklist items, etc.)
│   ├── tests/          # Test files
│   ├── standalone.js   # Entry point for standalone mode
│   └── index.js        # Main entry point
├── scripts/            # Build and utility scripts
└── dist/               # Generated standalone distribution
```

## Environment Variables

The following environment variables can be used:

- `REACT_APP_API_URL` - API URL for backend services (default: none, operates in local storage mode)
- `REACT_APP_ANALYTICS_ID` - Google Analytics ID (optional)
- `REACT_APP_ENABLE_METRICS` - Enable usage metrics (true/false)

## Security Considerations

When contributing, please keep the following security considerations in mind:

1. **Input Validation**: All user inputs should be validated and sanitized to prevent XSS attacks
2. **CSRF Protection**: Any forms submitting data should include CSRF protection
3. **Rate Limiting**: API endpoints should include rate limiting to prevent abuse
4. **Data Storage**: Be careful with what data is stored in localStorage or sessionStorage
5. **Dependency Management**: Keep dependencies updated to avoid security vulnerabilities

## Building for Production

### Standard Build

```
npm run build
```

### Standalone Widget Build

For creating the embeddable standalone version:

```
npm run build-standalone
```

This will:
1. Build the React application
2. Process the files for embedding
3. Create an `embed-code.html` with integration instructions
4. Output files to the `dist/` directory

## Testing Cross-Browser Compatibility

We aim to support:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest version)

When implementing CSS features, ensure:
1. Include fallbacks for CSS variables
2. Test on multiple browsers
3. Use Autoprefixer for vendor prefixes (this is included in the build process)

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

## Getting Help

If you have questions or need help integrating with the Vowly platform, please email support@vowly.wedding.

## Questions?

Feel free to reach out to the maintainers if you have any questions about contributing.

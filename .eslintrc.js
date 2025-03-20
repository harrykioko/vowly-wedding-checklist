module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off' // Since we're not using TypeScript or PropTypes
  }
};

// src/styles/theme.js
export const theme = {
  colors: {
    primary: '#e53e3e',
    text: '#333',
    textLight: '#666',
    border: '#ddd',
    backgroundLight: '#f5f5f5',
    white: '#fff',
    success: '#15803d',
    warning: '#d97706',
    placeholder: '#eee'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  },
  transition: {
    default: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease'
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: '600'
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400'
    },
    small: {
      fontSize: '0.875rem',
      fontWeight: '400'
    }
  }
};
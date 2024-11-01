import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
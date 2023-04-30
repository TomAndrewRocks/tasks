import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './theme/general';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './contexts/authContext';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <ThemeProvider theme={customTheme}>
    <AppRoutes />
  </ThemeProvider>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './theme/general';
import { AppRoutes } from './routes/AppRoutes';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <ThemeProvider theme={customTheme}>
    <AppRoutes />
  </ThemeProvider>,
);

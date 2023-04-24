import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { Dashboard } from './pages/Dashboard';
import { customTheme } from './theme/general';

export const App: FC = (): ReactElement => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
};

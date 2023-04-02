import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { Dashboard } from './pages/Dashboard';
import { customTheme } from './theme/general';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './contexts/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

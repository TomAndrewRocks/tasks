import { Alert, AlertColor, Snackbar } from '@mui/material';
import React from 'react';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: AlertColor;
}

export const ToastAlert = ({
  open,
  onClose,
  severity,
  message,
}: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

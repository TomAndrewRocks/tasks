import {
  Alert,
  AlertColor,
  Box,
  Grid,
  LinearProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { FC, ReactElement, useState } from 'react';
import { AuthForm } from '../../components/Form';
import { useAuth } from '../../hooks/useAuth';

export const AuthView: FC = (): ReactElement => {
  const {
    formType,
    handleLogin,
    handleRegister,
    handleFormType,
  } = useAuth();

  const [loading, setIsLoading] = useState(false);
  const [hotMessage, setHotMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [messageLevel, setMessageLevel] =
    useState<AlertColor>('info');

  const setLoading = () => {
    setIsLoading(!loading);
  };

  const handleClose = () => {
    setHotMessage(false);
  };

  const handleAuthentication = () => {
    setLoading();
    try {
      if (formType === 'Sign In') {
        handleLogin();
      }
      if (formType === 'Sign Up') {
        handleRegister();
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <Grid
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      gap={4}
      sx={{
        background: '#000',
        width: '100vw',
        height: '100vh',
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            width: '100vw',
            top: 0,
            bottom: 0,
            height: 8,
          }}
        />
      )}
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        gap={4}
        sx={{
          background: '#101010',
          padding: 4,
          borderRadius: 1
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          color={'white'}
        >
          {formType}
        </Typography>
        <AuthForm
          type={formType}
          loading={loading}
          onClick={handleAuthentication}
        />
        <Typography
          variant="h6"
          component={'h6'}
          color={'white'}
          sx={{ cursor: 'pointer' }}
          onClick={handleFormType}
        >
          {formType === 'Sign In'
            ? 'Not registered? Sign up in here!'
            : 'Already registered? Sign in here!'}
        </Typography>
      </Box>
      <Snackbar
        open={hotMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={messageLevel}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

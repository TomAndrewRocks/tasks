import {
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import React, { FC, ReactElement, useState } from 'react';
import { AuthForm } from '../../components/Form';
import { useAuth } from '../../hooks/useAuth';

export const AuthView: FC = (): ReactElement => {
  const {
    // loading,
    formType,
    handleLogin,
    handleRegister,
    handleFormType,
    // setIsLoading,
  } = useAuth();

  const [loading, setIsLoading] = useState(false);

  const setLoading = () => {
    setIsLoading(!loading);
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(!loading)
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
      <Typography
        variant="h3"
        component="h2"
        color={'white'}
      >
        {formType}
      </Typography>
      <AuthForm
        type={formType}
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
    </Grid>
  );
};

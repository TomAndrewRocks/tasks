import {
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TextInput } from '../Inputs/TextInput';
import { useAuth } from '../../hooks/useAuth';
import { IAuthForm } from '../../interfaces/IAuthForm';
import { useMediaQuery } from 'react-haiku';

export const AuthForm = ({
  type,
  onClick,
  loading,
}: IAuthForm) => {
  const {
    email,
    password,
    setEmail,
    errorMessage,
    setPassword,
  } = useAuth();

  const isEdging = useMediaQuery('(max-width: 540px)');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  useEffect(() => {
    if (errorMessage === 'Invalid e-mail!') {
      setErrorEmail(errorMessage);
    }
    if (errorMessage === 'Invalid password!') {
      setErrorPass(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (loading) {
      setErrorEmail('');
      setErrorPass('');
    }
  }, [loading]);

  return (
    <Box width={isEdging ? 300 : 500}>
      <form>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <TextInput
            title="E-mail"
            value={email}
            disabled={loading}
            placeholder="Type your e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            component={'p'}
            fontSize={12}
            color={'red'}
          >
            {errorEmail && `*${errorEmail}`}
          </Typography>
          <TextInput
            title="Password"
            value={password}
            type="password"
            disabled={loading}
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography
            component={'p'}
            fontSize={12}
            color={'red'}
          >
            {errorPass && `* ${errorPass}`}
          </Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onClick}
            // disabled={
            //   !title ||
            //   !description ||
            //   !status ||
            //   !priority ||
            //   loading
            // }
          >
            {type === 'Sign In' ? 'Sign In' : 'Sign Up'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

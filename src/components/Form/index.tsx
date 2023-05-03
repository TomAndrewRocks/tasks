import {
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
    formType,
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

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      if (formType === 'Sign Up') {
        if (!isValidEmail(e.target.value) && email != '') {
          setErrorEmail('Email is invalid');
        } else {
          setErrorEmail('');
        }
      }
      setEmail(e.target.value);
    },
    [email],
  );

  const handlePasswordChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      if (formType === 'Sign Up') {
        if (password.length <= 5) {
          setErrorPass(
            'Password needs to be longer than that!',
          );
        } else {
          setErrorPass('');
        }
      }

      setPassword(e.target.value);
    },
    [password],
  );

  useEffect(() => {
    if (loading) {
      setErrorEmail('');
      setErrorPass('');
    }
  }, [loading]);

  useEffect(() => {
    if (
      formType === 'Sign In' &&
      (email != '' || password != '')
    ) {
      setErrorEmail('');
      setErrorPass('');
    }
  }, [email, password]);

  return (
    <Box width={isEdging ? 300 : 500}>
      <form>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <TextInput
            title="E-mail"
            value={email}
            type="e-mail"
            disabled={loading}
            placeholder="Type your e-mail"
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
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
            disabled={
              (errorEmail != '' || errorPass != '') && true
            }
          >
            {type === 'Sign In' ? 'Sign In' : 'Sign Up'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

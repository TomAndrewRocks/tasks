import {
  Box,
  Button,
  LinearProgress,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { TextInput } from '../Inputs/TextInput';
import { useAuth } from '../../hooks/useAuth';
import { IAuthForm } from '../../interfaces/IAuthForm';
import { useMediaQuery } from 'react-haiku';

export const AuthForm = ({ type, onClick }: IAuthForm) => {
  const {
    loading,
    email,
    password,
    setEmail,
    setPassword,
  } = useAuth();

  const isEdging = useMediaQuery('(max-width: 540px)');

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
          <TextInput
            title="Password"
            value={password}
            type="password"
            disabled={loading}
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
          />

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

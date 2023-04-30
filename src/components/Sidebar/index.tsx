import { Grid } from '@mui/material';
import React, { FC, ReactElement, useEffect } from 'react';
import { Profile } from '../Profile';
import { TaskForm } from '../TaskForm';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar: FC = (): ReactElement => {
  const { handleLogout, email, isUserAuth } = useAuth();

  useEffect(() => {
    console.log(email);
  }, [email, isUserAuth]);

  return (
    <Grid
      item
      md={4}
      sx={{
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Profile name="Bondo" />
      <TaskForm />
      <button onClick={handleLogout}>logout</button>
    </Grid>
  );
};

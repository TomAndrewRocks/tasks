import { Grid } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { TasksView } from '../../components/Tasks';

export const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight={'100vh'} p="0" m="0">
      <TasksView />
      <Sidebar />
    </Grid>
  );
};

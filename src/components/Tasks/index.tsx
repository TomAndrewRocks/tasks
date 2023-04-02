import { Box, Grid } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { TaskItem } from '../Task';
import { TaskCounter } from '../TaskCounter';

export const TasksView = () => {
  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={8} width={500}>
        <h2>
          Tasks Status:
          <br />
          {format(new Date(), 'PPPP')}
        </h2>
      </Box>
      <Grid
        width={800}
        container
        display={'flex'}
        justifyContent={'center'}
      >
        <Grid
          item
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-around'}
          md={10}
          xs={12}
          mb={8}
        >
          <Box>
            <TaskCounter />
          </Box>
          <Box>
            <TaskCounter />
          </Box>
          <Box>
            <TaskCounter />
          </Box>
        </Grid>
        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          xs={10}
          md={8}
        >
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </Grid>
      </Grid>
    </Grid>
  );
};

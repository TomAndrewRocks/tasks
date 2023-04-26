import { Box, Typography } from '@mui/material';
import React from 'react';
import { borderOverPriority } from '../../helpers/borderOverPriority';
import { ITask } from '../../interfaces/ITask';
import TaskFooter from './Footer';
import { TaskHeader } from './Header';

export const TaskItem = ({
  priority,
  title,
  date,
  description,
  _id,
}: ITask) => {
  return (
    <Box
      display={'flex'}
      width={'100%'}
      justifyContent={'flex-start'}
      flexDirection={'column'}
      mb={4}
      p={3}
      sx={{
        width: '100%',
        background: '#161616',
        borderRadius: '8px',
        border: '1px solid transparent',
      }}
    >
      <TaskHeader title={title} date={date} />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box>
          <Typography>{description}</Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              border: '1px solid transparent',
              padding: 0.8,
              borderRadius: 2,
              borderColor: borderOverPriority(priority),
            }}
          >
            {priority.charAt(0).toUpperCase() +
              priority.slice(1)}
          </Typography>
        </Box>
      </Box>
      <TaskFooter _id={_id} />
    </Box>
  );
};

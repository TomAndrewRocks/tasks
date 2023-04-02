import { Box, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { borderOverPriority } from '../../helpers/borderOverPriority';
import { ITask } from '../../interfaces/ITask';
import TaskFooter from './Footer';
import { TaskHeader } from './Header';

export const TaskItem = ({
  status,
  priority,
  title,
  date,
  description,
  onChange,
  onClick,
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
        background: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: borderOverPriority(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <Box>
        <Typography>{description}</Typography>
      </Box>
      <TaskFooter onChange={onChange} onClick={onClick} />
    </Box>
  );
};

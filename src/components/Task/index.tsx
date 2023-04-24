import { Box, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { borderOverPriority } from '../../helpers/borderOverPriority';
import { ITask } from '../../interfaces/ITask';
import TaskFooter from './Footer';
import { TaskHeader } from './Header';
import { Status } from '../TaskForm/enums/Status';

export const TaskItem = ({
  check,
  priority,
  title,
  date,
  description,
  onChange,
  onClick,
  onCheck,
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
        background: '#131313',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: borderOverPriority(priority),
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
          <Typography>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Typography>
        </Box>
      </Box>
      <TaskFooter
        check={check}
        onCheck={onCheck}
        onChange={onChange}
        onClick={onClick}
      />
    </Box>
  );
};

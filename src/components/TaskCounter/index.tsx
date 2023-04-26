import { Avatar, Box, Typography } from '@mui/material';
import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { emitBorderColor } from '../../helpers/emitBorderColor';
import { emitLabel } from '../../helpers/emitLabel';
import { ITaskCounter } from '../../interfaces/ITaskCounter';
import { Status } from '../TaskForm/enums/Status';
import { useTaskStore } from '../../contexts/taskStore';
import { api } from '../../services/api';

export const TaskCounter: FC<ITaskCounter> = (
  props,
): ReactElement => {
  const { status = Status.completed, count = 0 } = props;

  const [pendingCount, setPendingCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const { inProgressTask, todoTask, completedTask } =
    useTaskStore();

  // const fetchData = async () => {
  //   try {
  //     const response = await api.get('/tasks');
  //     setPendingCount(response.data.length);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [todoTask]);

  useEffect(() => {
    setPendingCount(todoTask.length);
    setInProgressCount(inProgressTask.length);
    setCompletedCount(completedTask.length);
  }, [todoTask, inProgressTask, completedTask]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Avatar
        sx={{
          backgroundColor: 'transparent',
          border: '5px solid',
          width: '96px',
          height: '96px',
          marginBottom: '16px',
          borderColor: `${emitBorderColor(status)}`,
        }}
      >
        <Typography color="#fff" variant="h4">
          {count >= 0 &&
            (status === 'To Do'
              ? pendingCount
              : status === 'In Progress'
              ? inProgressCount
              : completedCount)}
        </Typography>
      </Avatar>
      <Typography
        color="#fff"
        fontWeight={'bold'}
        fontSize={'20px'}
        variant={'h5'}
      >
        {emitLabel(status)}
      </Typography>
    </Box>
  );
};

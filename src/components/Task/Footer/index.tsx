import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ITaskFooter } from '../../../interfaces/ITaskFooter';
import { Status } from '../../TaskForm/enums/Status';
import { api } from '../../../services/api';
import { useTaskStore } from '../../../contexts/taskStore';

const TaskFooter = ({ _id, data }: ITaskFooter) => {
  const {
    addToPending,
    removeFromPending,
    addToCompleted,
    removeFromCompleted,
    addToInProgress,
    removeFromInProgress,
  } = useTaskStore();

  const [isChecked, setIsChecked] =
    useState<boolean>(false);
  const [isCompleted, setIsCompleted] =
    useState<boolean>(false);

  const updateTaskStatus = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      api.put(`/tasks/${_id}`, {
        status: Status.inProgress,
      });
      addToInProgress();
      removeFromPending();
      removeFromCompleted();
    } else {
      api
        .put(`/tasks/${_id}`, {
          status: Status.todo,
        })
        .then(() => {
          setIsCompleted(false);
          addToPending();
          removeFromCompleted();
          removeFromInProgress();
        });
    }
  };

  const completeTaskStatus = () => {
    if (!isCompleted) {
      api
        .put(`/tasks/${_id}`, {
          status: Status.completed,
        })
        .then(() => {
          setIsChecked(true);
          setIsCompleted(true);
          addToCompleted();
          removeFromInProgress();
          removeFromPending();
        });
    } else {
      api
        .put(`/tasks/${_id}`, {
          status: Status.todo,
        })
        .then(() => {
          addToPending();
          removeFromCompleted();
          removeFromInProgress();
        });
      setIsCompleted(false);
      setIsChecked(false);
    }
  };

  const getStatusById = async () => {
    try {
      const res = await api.get(`/tasks/${_id}`);
      const status = res.data.task.status;
      if (status !== 'To Do') {
        setIsChecked(true);
      }
      if (status === 'Completed') {
        setIsCompleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatusById();
  }, []);


  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      mt={4}
    >
      <FormControlLabel
        checked={isChecked}
        label={isChecked ? Status.inProgress : Status.todo}
        onChange={updateTaskStatus}
        control={<Switch color="warning" />}
        disabled={isCompleted}
      />
      <Button
        variant="contained"
        color={isCompleted ? 'success' : 'secondary'}
        size="small"
        onClick={completeTaskStatus}
        sx={{ color: '#fff' }}
      >
        {isCompleted ? 'Completed!' : 'Finish Task'}
      </Button>
    </Box>
  );
};

export default TaskFooter;

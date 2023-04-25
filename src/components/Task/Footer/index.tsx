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

const TaskFooter = ({ _id }: ITaskFooter) => {
  const {
    addToInProgress,
    addToCompleted,
    addToPending,
    removeFromCompleted,
    removeFromPending,
    removeFromProgress,
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
      if (_id) {
        addToInProgress(_id);
        removeFromPending(_id);
        removeFromCompleted(_id);
      }
    } else {
      api
        .put(`/tasks/${_id}`, {
          status: Status.todo,
        })
        .then(() => {
          setIsCompleted(false);
          if (_id) {
            addToPending(_id);
            removeFromProgress(_id);
            removeFromCompleted(_id);
          }
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
          if (_id) {
            addToCompleted(_id);
            removeFromProgress(_id);
            removeFromPending(_id);
          }
        });
    } else {
      api
        .put(`/tasks/${_id}`, {
          status: Status.todo,
        })
        .then(() => {
          if (_id) {
            addToPending(_id);
            removeFromProgress(_id);
            removeFromCompleted(_id);
          }
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

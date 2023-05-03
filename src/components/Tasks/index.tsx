import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { TaskItem } from '../Task';
import { TaskCounter } from '../TaskCounter';
import moment from 'moment';
import { useAuth } from '../../hooks/useAuth';

export const TasksView = () => {
  const { tasks, fetchData } = useAuth();
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusLength = () => {
    if (tasks) {
      const todoArray = tasks.filter(
        (task) => task.status === 'To Do',
      );
      const inProgArray = tasks.filter(
        (task) => task.status === 'In Progress',
      );
      const completeArray = tasks.filter(
        (task) => task.status === 'Completed',
      );
      setTodoCount(todoArray.length);
      setInProgressCount(inProgArray.length);
      setCompletedCount(completeArray.length);
    }
  };

  useEffect(() => {
    getStatusLength();
  }, [tasks]);

  const tasksComponent = useMemo(() => {
    if (tasks.length < 1) {
      return (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          mt={30}
          gap={5}
        >
          <Typography>
            You have no tasks! Go for it, man!
          </Typography>
        </Box>
      );
    }
    if (tasks.length >= 1) {
      tasks.map((task) => (
        <Box key={task._id}>
          <TaskItem
            _id={task._id}
            data={tasks}
            date={task.date}
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
          />
        </Box>
      ));
    }
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={30}
        gap={5}
      >
        <CircularProgress />
        <Typography>Loading your tasks...</Typography>
      </Box>
    );
  }, [tasks, fetchData]);

  return (
    <Grid item md={8} px={25}>
      <Box
        mb={4}
        px={8}
        width={700}
        ml={8}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        textAlign={'center'}
      >
        <h2>
          Tasks Manager
          <br />
          {moment(Date.now()).format('MM / DD / YYYY')}
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
          mb={4}
          ml={2}
        >
          <Box>
            <TaskCounter
              data={tasks}
              count={todoCount}
              status={'To Do'}
            />
          </Box>
          <Box>
            <TaskCounter
              data={tasks}
              count={inProgressCount}
              status={'In Progress'}
            />
          </Box>
          <Box>
            <TaskCounter
              data={tasks}
              count={completedCount}
              status={'Completed'}
            />
          </Box>
        </Grid>
        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          xs={10}
          md={9}
        >
          {tasksComponent}
        </Grid>
      </Grid>
    </Grid>
  );
};

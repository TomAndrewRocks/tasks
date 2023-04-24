import { Box, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { TaskItem } from '../Task';
import { TaskCounter } from '../TaskCounter';
import { api } from '../../services/api';
import { ITask } from '../../interfaces/ITask';
import { Status } from '../TaskForm/enums/Status';

export const TasksView = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [check, setChecked] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = (taskId: string | undefined) => {
    if (!check) {
      api
        .put(`/tasks/${taskId}`, {
          status: Status.inProgress,
        })
        .then(() => {
          fetchData();
        });
    } else {
      api
        .put(`/tasks/${taskId}`, {
          status: Status.todo,
        })
        .then(() => {
          fetchData();
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {tasks.map((task) => (
            <Box key={task._id}>
              <TaskItem
                check={check}
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                onCheck={() => setChecked(!check)}
                onChange={() => updateTaskStatus(task._id)}
                onClick={() => updateTaskStatus(task._id)}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

import { Box, Grid } from '@mui/material';
import { format } from 'date-fns';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TaskItem } from '../Task';
import { TaskCounter } from '../TaskCounter';
import { api } from '../../services/api';
import { ITask } from '../../interfaces/ITask';

export const TasksView = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isChecked, setIsChecked] =
    useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={8} width={500} ml={8}>
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
          ml={2}
        >
          <Box>
            <TaskCounter
              count={todoCount}
              status={'To Do'}
            />
          </Box>
          <Box>
            <TaskCounter
              count={inProgressCount}
              status={'In Progress'}
            />
          </Box>
          <Box>
            <TaskCounter
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
          md={8}
        >
          {tasks.map((task) => (
            <Box key={task._id}>
              <TaskItem
                _id={task._id}
                date={task.date}
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                check={isChecked}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

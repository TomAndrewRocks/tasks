import { Avatar, Box, Typography } from '@mui/material';
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { emitBorderColor } from '../../helpers/emitBorderColor';
import { emitLabel } from '../../helpers/emitLabel';
import { ITaskCounter } from '../../interfaces/ITaskCounter';
import { Status } from '../TaskForm/enums/Status';
import { useTaskStore } from '../../contexts/taskStore';
import { useFirstRender } from 'react-haiku';

let initialTodo = 0;
let initialProgress = 0;
let initialCompleted = 0;

export const TaskCounter: FC<ITaskCounter> = (
  props,
): ReactElement => {
  const {
    status = Status.completed,
    count = 0,
    data = [],
  } = props;

  const [initTodoCount, setTodoCount] = useState(0);
  const [initProgressCount, setProgressCount] = useState(0);
  const [initCompleteCount, setCompleteCount] = useState(0);

  const { todoTask, completedTask, inProgressTask } =
    useTaskStore();

  const isFirst = useFirstRender();

  useEffect(() => {
    console.log(todoTask.length);
    console.log(completedTask.length);
    console.log(inProgressTask.length);
  }, [todoTask, completedTask, inProgressTask]);

  const findStatusMapper = useCallback(() => {
    const todoCount = data.filter(
      (task) => task.status === 'To Do',
    );
    const progressCount = data.filter(
      (task) => task.status === 'In Progress',
    );
    const completedCount = data.filter(
      (task) => task.status === 'Completed',
    );

    initialTodo = todoCount.length;
    initialProgress = progressCount.length;
    initialCompleted = completedCount.length;

    setTodoCount(initialTodo);
    setProgressCount(initialProgress);
    setCompleteCount(initialCompleted);

    return {
      initialTodo,
      initialProgress,
      initialCompleted,
    };
  }, [data, todoTask]);

  useEffect(() => {
    findStatusMapper();
  }, [data, todoTask]);

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
          {isFirst
            ? status === 'To Do'
              ? initTodoCount
              : status === 'In Progress'
              ? initProgressCount
              : initCompleteCount
            : status === 'To Do'
            ? todoTask.length
            : status === 'In Progress'
            ? inProgressTask.length
            : completedTask.length}
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

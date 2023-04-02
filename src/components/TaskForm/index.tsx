import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import { DateInput } from '../Inputs/DateInput';
import { DescriptionInput } from '../Inputs/Description';
import { SelectInput } from '../Inputs/SelectInput';
import { TitleInput } from '../Inputs/TitleInput';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import { useMutation } from '@tanstack/react-query';
import { sendAPIRequest } from '../../services/sendAPIRequest';
import { ICreateTask } from '../../interfaces/ICreateTask';

export const TaskForm: FC = (): ReactElement => {
  const serverURL = import.meta.env.VITE_SERVER;

  const [title, setTitle] = useState<string | undefined>(
    undefined,
  );
  const [description, setDescription] = useState<
    string | undefined
  >(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(
    Priority.normal,
  );

  const [successReturn, setSuccessReturn] =
    useState<boolean>(false);

  const createTaskMutation = useMutation(
    (data: ICreateTask) =>
      sendAPIRequest(`${serverURL}/tasks`, 'POST', data),
  );

  function handleNewTask() {
    if (!title || !date || !description) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };
    createTaskMutation.mutate(task);
  }

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setSuccessReturn(true);
    }

    const successTimeout = setTimeout(() => {
      setSuccessReturn(false);
    }, 5000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      width={'100%'}
      px={4}
      my={6}
    >
      {successReturn && (
        <Alert
          severity="success"
          sx={{ width: '100%', marginBottom: '16px' }}
        >
          <AlertTitle>Success</AlertTitle>
          Task successfully created!
        </Alert>
      )}
      <Typography mb={2} variant="h6" component={'h2'}>
        Create a Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TitleInput
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DescriptionInput
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DateInput
          disabled={createTaskMutation.isLoading}
          value={date}
          onChange={(date) => setDate(date)}
        />
        <Stack
          sx={{
            width: '100%',
          }}
          spacing={2}
          direction={'row'}
        >
          <SelectInput
            value={status}
            disabled={createTaskMutation.isLoading}
            name="Status"
            label={'Status'}
            items={[
              {
                value: Status.todo,
                label: Status.todo,
              },
              {
                value: Status.inProgress,
                label: Status.inProgress,
              },
              {
                value: Status.completed,
                label: Status.completed,
              },
            ]}
            onChange={(e) =>
              setStatus(e.target.value as string)
            }
          />
          <SelectInput
            disabled={createTaskMutation.isLoading}
            name="Priority"
            label="Priority"
            value={priority}
            items={[
              {
                value: Priority.low,
                label: Priority.low,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.high,
                label: Priority.high,
              },
            ]}
            onChange={(e) =>
              setPriority(e.target.value as string)
            }
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleNewTask}
          disabled={
            !title ||
            !date ||
            !description ||
            !status ||
            !priority
          }
        >
          Create task
        </Button>
      </Stack>
    </Box>
  );
};

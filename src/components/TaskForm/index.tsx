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
import { DescriptionInput } from '../Inputs/Description';
import { SelectInput } from '../Inputs/SelectInput';
import { TitleInput } from '../Inputs/TitleInput';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import { api } from '../../services/api';
import { useTaskStore } from '../../contexts/taskStore';

export const TaskForm: FC = (): ReactElement => {
  const { addToPending } = useTaskStore();

  const [title, setTitle] = useState<string | undefined>(
    '',
  );
  const [description, setDescription] = useState<
    string | undefined
  >('');
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(
    Priority.normal,
  );

  const [successReturn, setSuccessReturn] =
    useState<boolean>(false);

  const [failReturn, setFailReturn] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  function handleNewTask() {
    setLoading(true);
    if (!title || !description) {
      return;
    }

    setTimeout(() => {
      try {
        api
          .post(`/tasks`, {
            title: title,
            description: description,
            status: status,
            priority: priority,
          })
          .then((res) => {
            console.log(res);
            setSuccessReturn(true);
            addToPending(res.data._id);
          })
          .catch((err) => {
            console.log(err);
            setFailReturn(true);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }, 500);
  }

  useEffect(() => {
    if (title || description !== '') {
      setSuccessReturn(false);
      setFailReturn(false);
    }
    console.log(title, description, status, priority);
  }, [title, description]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      width={'100%'}
      px={4}
      my={successReturn || failReturn ? -2.5 : 2}
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
      {failReturn && (
        <Alert
          severity="error"
          sx={{ width: '100%', marginBottom: '16px' }}
        >
          <AlertTitle>Error</AlertTitle>
          Failed to create Task!
        </Alert>
      )}
      <Typography mb={2} variant="h6" component={'h2'}>
        Create a Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TitleInput
          value={title}
          disabled={loading}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DescriptionInput
          value={description}
          disabled={loading}
          onChange={(e) => setDescription(e.target.value)}
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
            name="Status"
            label={'Status'}
            disabled={loading}
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
            name="Priority"
            label="Priority"
            value={priority}
            disabled={loading}
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
        {loading && <LinearProgress />}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleNewTask}
          disabled={
            !title ||
            !description ||
            !status ||
            !priority ||
            loading
          }
        >
          Create task
        </Button>
      </Stack>
    </Box>
  );
};

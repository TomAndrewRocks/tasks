import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React from 'react';
import { ITaskFooter } from '../../../interfaces/ITaskFooter';

const TaskFooter = ({ onChange, onClick }: ITaskFooter) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        onChange={onChange}
        control={<Switch color="warning" />}
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={onClick}
        sx={{ color: '#fff' }}
      >
        Complete Task
      </Button>
    </Box>
  );
};

export default TaskFooter;

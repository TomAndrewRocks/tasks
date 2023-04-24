import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { useState } from 'react';
import { ITaskFooter } from '../../../interfaces/ITaskFooter';
import { Status } from '../../TaskForm/enums/Status';

const TaskFooter = ({
  onChange,
  onClick,
  check,
  onCheck,
}: ITaskFooter) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      mt={4}
    >
      <FormControlLabel
        label={check ? Status.inProgress : Status.todo}
        onChange={onChange}
        onClick={onCheck}
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

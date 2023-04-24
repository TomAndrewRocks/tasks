import { Box, Chip, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { FC, ReactElement } from 'react';
import { ITaskHeader } from '../../../interfaces/ITaskHeader';

export const TaskHeader: FC<ITaskHeader> = (
  props,
): ReactElement => {
  const { title = 'Task Title', date = new Date() } = props;
  return (
    <Box
      display={'flex'}
      width={'100%'}
      justifyContent={'space-between'}
      mb={4}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip
          variant="outlined"
          label={format(date, 'PPP')}
        />
      </Box>
    </Box>
  );
};

import { Box, Chip, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ITaskHeader } from '../../../interfaces/ITaskHeader';
import moment from 'moment';

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
        <Typography variant="h6" width={200}>{title}</Typography>
      </Box>
      <Box>
        <Chip
          variant="outlined"
          label={moment(date).format(
            'MMMM Do YYYY, h:mm:ss a',
          )}
        />
      </Box>
    </Box>
  );
};

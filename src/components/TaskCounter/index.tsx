import { Avatar, Box, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { emitBorderColor } from '../../helpers/emitBorderColor';
import { emitLabel } from '../../helpers/emitLabel';
import { ITaskCounter } from '../../interfaces/ITaskCounter';
import { Status } from '../TaskForm/enums/Status';

export const TaskCounter: FC<ITaskCounter> = (
  props,
): ReactElement => {
  const { status = Status.completed, count = 0 } = props;
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
          {count >= 0 ? count : ''}
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

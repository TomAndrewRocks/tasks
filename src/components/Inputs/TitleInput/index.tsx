import { TextField } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ITextInput } from '../../../interfaces/ITextInput';

export const TitleInput: FC<ITextInput> = (
  props,
): ReactElement => {
  return (
    <TextField
      id="title"
      placeholder="Task title"
      variant="outlined"
      label="Task Title"
      size="small"
      name="title"
      fullWidth
      disabled={props.disabled}
      onChange={props.onChange}
    />
  );
};

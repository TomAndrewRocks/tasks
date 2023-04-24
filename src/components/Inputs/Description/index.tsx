import { TextField } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ITextInput } from '../../../interfaces/ITextInput';

export const DescriptionInput: FC<ITextInput> = (
  props,
): ReactElement => {
  return (
    <TextField
      id="description"
      placeholder="Task description"
      variant="outlined"
      label="Task description"
      size="small"
      name="description"
      multiline
      value={props.value}
      rows={4}
      fullWidth
      disabled={props.disabled}
      onChange={props.onChange}
    />
  );
};

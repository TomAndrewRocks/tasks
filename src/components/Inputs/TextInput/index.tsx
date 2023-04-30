import { TextField } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ITextInput } from '../../../interfaces/ITextInput';

export const TextInput: FC<ITextInput> = (
  props,
): ReactElement => {
  return (
    <TextField
      placeholder={props.placeholder}
      variant="outlined"
      label={props.title}
      size="small"
      name="title"
      value={props.value}
      fullWidth
      disabled={props.disabled}
      onChange={props.onChange}
      type={props.type}
    />
  );
};

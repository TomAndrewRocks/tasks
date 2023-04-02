import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import React, { FC, ReactElement } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { IDateInput } from '../../../interfaces/IDateInput';

export const DateInput: FC<IDateInput> = (
  props,
): ReactElement => {
  const { onChange = (date) => console.log(date) } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        disabled={props.disabled}
        label="Task Date"
        inputFormat={'dd/MM/yyyy'}
        value={new Date()}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

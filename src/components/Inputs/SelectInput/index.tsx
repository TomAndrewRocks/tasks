import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';
import Select from '@mui/material/Select';
import { ISelectInput } from '../../../interfaces/ISelectInput';

export const SelectInput: FC<ISelectInput> = (
  props,
): ReactElement => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${props.name}-id`}>
        {props.label}
      </InputLabel>
      <Select
        label={props.label}
        id={`${props.name}-id-select`}
        value={props.value}
        labelId={`${props.name}-id`}
        name={props.name}
        disabled={props.disabled}
        onChange={props.onChange}
      >
        {props.items?.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

import { SelectChangeEvent } from '@mui/material';

export interface ISelectItems {
  value: string;
  label: string;
}

export interface ISelectInput {
  name?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: SelectChangeEvent) => void;
  items?: ISelectItems[];
}

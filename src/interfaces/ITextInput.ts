import { HTMLInputTypeAttribute } from 'react';

export interface ITextInput {
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  label?: string;
  title?: string;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
}

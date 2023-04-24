import { HTMLInputTypeAttribute } from 'react';

export interface ITextInput {
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
}

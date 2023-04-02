import { HTMLInputTypeAttribute } from 'react';

export interface ITextInput {
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
}

export interface IDateInput {
  disabled?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

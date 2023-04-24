import { TaskCounterStatusType } from './ITaskCounter';

export interface ITaskFooter {
  onChange?: () => void;
  onClick?: () => void;
  check: boolean;
  onCheck: () => void;
}

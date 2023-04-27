import { ITask } from './ITask';
import { TaskCounterStatusType } from './ITaskCounter';

export interface ITaskFooter {
  _id?: string;
  data: ITask[];
}

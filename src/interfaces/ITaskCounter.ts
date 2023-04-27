import { Status } from '../components/TaskForm/enums/Status';
import { ITask } from './ITask';

export type TaskCounterStatusType =
  | Status.todo
  | Status.inProgress
  | Status.completed;

export interface ITaskCounter {
  count?: number;
  status?: TaskCounterStatusType | any;
  data: ITask[];
}

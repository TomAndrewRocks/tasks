import { Schema, model } from 'mongoose';
import { Priority, Status } from '../utils/enum';

export interface ITask {
  title: string;
  date: Date;
  time: string;
  description: string;
  priority: Priority;
  status: Status;
  user: string;
}

const TaskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: Status.todo,
    required: true,
  },
  priority: {
    type: String,
    default: Priority.normal,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

export default model<ITask>('ITask', TaskSchema);

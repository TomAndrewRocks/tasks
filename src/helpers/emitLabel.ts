import React from 'react';
import { Status } from '../components/TaskForm/enums/Status';
import { TaskCounterStatusType } from '../interfaces/ITaskCounter';

export const emitLabel = (
  status: TaskCounterStatusType,
): string => {
  switch (status) {
    case Status.todo:
      return 'Todo';
    case Status.inProgress:
      return 'In Progress';
    case Status.completed:
      return 'Completed';
    default:
      return 'Todo';
  }
};

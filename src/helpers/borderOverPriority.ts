import React from 'react';
import { Priority } from '../components/TaskForm/enums/Priority';

export const borderOverPriority = (
  priority: string,
): string => {
  switch (priority) {
    case Priority.normal:
      return 'grey.900';
    case Priority.low:
      return 'info.light';
    case Priority.high:
      return 'error.light';
    default:
      return 'grey.900';
  }
};

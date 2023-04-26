import { body } from 'express-validator';
import { Status } from './enum';

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is required!')
    .trim()
    .isString()
    .withMessage('ID needs to be a valid uuid'),
  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status can only be To Do, In Progress or Completed!',
    ),
];

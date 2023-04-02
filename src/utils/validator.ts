import { body, ValidationChain } from 'express-validator';
import { Priority, Status } from './enum';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required!')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required!')
    .trim()
    .isString()
    .withMessage('Date needs to be in date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in text format'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage(
      'Priority can only be normal, high or low!',
    ),
  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status can only be todo, inProgress or completed!',
    ),
];

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
      'Status can only be todo, inProgress or completed!',
    ),
];

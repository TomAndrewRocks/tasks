import { NextFunction, Request, Response } from 'express';
import taskModel from '../models/taskModel';

const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await taskModel.find();
  try {
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority } = req.body;

  try {
    const taskTitleExists = await taskModel.findOne({ title });

    if (taskTitleExists) {
      return res.status(400).json({
        error: 'Oops',
        message: 'Task already registered',
      });
    }

    const task = await taskModel.create({
      title,
      description,
      priority,
      status,
    });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).send({
      error: 'Task register failed',
      message: error,
    });
  }
};

const getTaskById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const taskId = req.params.id;
  try {
    return taskModel
      .findById(taskId)
      .then((task) =>
        task
          ? res.status(200).json({ task })
          : res
              .status(404)
              .json({ message: 'Task not found!' }),
      );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const taskId = req.params.id;
  try {
    return taskModel.findById(taskId).then((task) => {
      if (task) {
        task.set(req.body);
        return task
          .save()
          .then((task) => {
            return res.status(201).json({ task });
          })
          .catch((error) => {
            return res.status(404).json({
              message:
                'Failed update of the selected Task',
            });
          });
      }
      return;
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const taskId = req.params.id;
  try {
    return taskModel
      .findByIdAndDelete(taskId)
      .then((task) =>
        task
          ? res.status(204).json({
              message: `Task: ${task} was deleted`,
            })
          : res
              .status(404)
              .json({ message: 'Task not found!' }),
      );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};

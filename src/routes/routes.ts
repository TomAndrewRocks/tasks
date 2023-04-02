import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../controllers/taskController';
import {
  updateValidator,
  createValidator,
} from '../utils/validator';

const router: Router = Router();

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createValidator, createTask);
router.put('/tasks/:id', updateValidator, updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;

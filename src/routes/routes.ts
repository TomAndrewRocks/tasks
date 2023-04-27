import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../controllers/taskController';
import { updateValidator } from '../utils/validator';
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
} from '../controllers/userController';

const router: Router = Router();
//tasks
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateValidator, updateTask);
router.delete('/tasks/:id', deleteTask);
//authentication
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/register', createUser);
router.post('/login', loginUser);
export default router;

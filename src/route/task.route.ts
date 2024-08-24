import express from 'express';
import { handleTask, limiter } from '../controller/taskController';

const router = express.Router();

router.route('/task').post(limiter, handleTask);

export default router;

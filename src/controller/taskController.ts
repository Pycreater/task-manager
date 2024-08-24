import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { enqueueTask } from '../queue/taskQueue';
import log from '../utils/logger';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each userId to 20 requests per windowsMs
  keyGenerator: (req: Request) => req.body.user_id,
  handler: (req: Request, res: Response) => {
    enqueueTask(req.body.user_id, req.body);
    res
      .status(429)
      .json({ message: 'Too many requests, please try again later.' });
  },
});

async function handleTask(req: Request, res: Response) {
  const { user_id } = req.body;

  try {
    enqueueTask(user_id, req.body);
    res.status(200).json({ message: 'Task enqueued successfully.' });
  } catch (error) {
    log.error('Error handling task:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export { limiter, handleTask };

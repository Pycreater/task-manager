import path from 'path';
import client from '../config/redisClient';
import { QUEUE_NAME } from '../utils/constants';
import log from '../utils/logger';
import fs from 'fs/promises';

interface Task {
  userId: string;
  task: any;
}

export function enqueueTask(userId: string, task: any) {
  const taskData: Task = { userId, task };
  client
    .rPush(QUEUE_NAME, JSON.stringify(taskData))
    .then(() => {
      log.info('Task enqueued successfully');
    })
    .catch((err) => {
      log.error('Error while enqueueing task:', err);
    });
}

export function dequeueTask(callback: (userId: string, task: any) => void) {
  client
    .lPop(QUEUE_NAME)
    .then((taskData) => {
      if (taskData) {
        const { userId, task }: Task = JSON.parse(taskData);
        callback(userId, task);
      } else {
        log.info('No tasks to dequeue');
      }
    })
    .catch((error) => {
      log.error('Error dequeuing task:', error);
    });
}

const logFilePath = path.resolve(__dirname, 'task_logs.txt');

async function processTasks() {
  dequeueTask(async (userId: string, task: any) => {
    try {
      await taskFunction(userId);
      log.info(`Task completed for user ${userId}`);
    } catch (error) {
      log.error(
        `Error processing task for user ${userId}: ${(error as Error).message}`
      );
    }
  });
}

async function taskFunction(userId: string) {
  const message = `${userId}-task completed at-${Date.now()}\n`;
  try {
    await fs.appendFile(logFilePath, message);
  } catch (error) {
    log.error('Error writing to log file:', error);
  }
}

export { processTasks };

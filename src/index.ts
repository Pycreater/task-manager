import { Request, Response } from 'express';
import { app } from './app';
import dotenv from 'dotenv';
import taskRouter from './route/task.route';

dotenv.config({
  path: './.env',
});

app.use('/api/v1', taskRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running.');
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

import { Request, Response } from 'express';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

app.get('/', (req: Request, res: Response) => {
  res.send('server is running.');
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

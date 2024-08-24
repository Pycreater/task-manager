import cluster from 'cluster';
import os from 'os';
import { app } from './app';
import { processTasks } from './queue/taskQueue';

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Worker processes can share TCP connection
  app.listen(process.env.PORT, () => {
    console.log(`Worker ${process.pid} started`);
  });

  processTasks(); // Start processing tasks in worker
}

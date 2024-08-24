
# Node Assignment: User Task Queuing with Rate Limiting

## Overview

This project implements a Node.js API cluster with a task queuing system and rate limiting. The API allows users to submit tasks, which are then processed with a limit of 1 task per second and 20 tasks per minute per user ID. The tasks are queued and handled in the background, with completion logs stored in a file.

## Project Structure

- **`index.ts`**: The main entry point of the application. It sets up the Express server and routes.
- **`cluster.ts`**: Handles the clustering of the application across CPU cores for better scalability.
- **`app.ts`**: Configures the Express application, including middleware and logging.
- **`task.route.ts`**: Defines the routes related to task handling.
- **`taskQueue.ts`**: Manages the task queue, including enqueuing, dequeuing, and processing tasks.
- **`taskController.ts`**: Implements the rate limiting and task handling logic.
- **`redisClient.ts`**: Configures and connects to the Redis client used for task queueing.


## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pycreater/task-manager.git
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following content:

   ```
   PORT=8000
   ```

4. **Build and start the application:**

   ```bash
   yarn dev
   ```

## Running the API

The API can be accessed at `http://localhost:8000/api/v1/task`. The endpoint accepts `POST` requests with a JSON body containing the `user_id`.

Example request:

```json
{
  "user_id": "123"
}
```

## Logging

Task completion logs are stored in the `task_logs.txt` file.

## Clustering

The application is clustered across all available CPU cores to handle high loads efficiently.

## License

This project is licensed under the ISC License.

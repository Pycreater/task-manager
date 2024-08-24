import { createClient } from '@redis/client';

const client = createClient();

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

client.connect();

export default client;

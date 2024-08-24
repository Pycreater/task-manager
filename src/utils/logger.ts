import pino from 'pino';
import pinoPretty from 'pino-pretty';

const prettyStream = pinoPretty({
  colorize: true,
  translateTime: 'SYS:standard',
});

const log = pino(prettyStream);

export default log;

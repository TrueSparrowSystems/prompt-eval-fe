import pino from 'pino';

// https://nextjs.org/docs/going-to-production#logging
// create pino logger
const logger = pino({
  browser: {
    serialize: true
  },
  level: 'debug',
  base: {
    env: process.env.NODE_ENV
  }
});

export default logger;

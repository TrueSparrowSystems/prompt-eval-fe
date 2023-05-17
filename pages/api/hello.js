// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import logger from '../../logger/logger';

export default function handler(req, res) {
  const data = {
    request: {
      method: req.method,
      url: req.url
    },
    response: {
      status: res.statusCode
    }
  };
  // Logging to pino
  logger.info(data, 'Handled response. Logged with pino');

  res.status(200).json({ name: 'John Doe' });
}

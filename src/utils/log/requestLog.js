import logger from './logger';

const requestLog = (req, res, next) => {
  const { ip, path, query, body, method } = req;

  logger.info(`Received request from ${ip}.
  Request:  method: ${method}, path: ${path}, query: ${JSON.stringify(query)}
            body:   ${JSON.stringify(body)}`);

  next();
};

export default requestLog;

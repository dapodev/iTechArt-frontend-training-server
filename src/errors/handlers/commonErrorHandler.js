import CommonError from '../CommonError';

const commonErrorHandler = (err, req, res, next) => {
  if (err instanceof CommonError) {
    res.status(err.status).send(err.message);
  } else {
      next();
  }
};

export default commonErrorHandler;

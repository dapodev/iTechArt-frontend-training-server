import STATUS_CODES from 'modules/config/constants/statusCodes';
import CommonError from '../CommonError';

const commonErrorHandler = (err, req, res, next) => {
  if (err instanceof CommonError) {
    res.status(err.status).send(err.message);
  } else {
    next(err);
  }
};

export default commonErrorHandler;

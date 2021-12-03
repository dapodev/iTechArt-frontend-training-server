import STATUS_CODES from 'modules/config/constants/statusCodes';

const internalErrorHandler = (err, req, res, next) => {
  res.status(STATUS_CODES.serverErrors.INTERNAL_ERROR).json(err.message);
};

export default internalErrorHandler;

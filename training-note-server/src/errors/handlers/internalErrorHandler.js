import STATUS_CODES from 'modules/config/constants/statusCodes';

const internalErrorHandler = (err, req, res) => {
  res.status(STATUS_CODES).json(err);
};

export default internalErrorHandler;
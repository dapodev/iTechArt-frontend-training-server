import STATUS_CODES from '../../config/constants/statusCodes';

import { generateErrors } from 'utils/validations/common';

const getNotesValidations = (req, res, next) => {
  const errors = generateErrors();

  if (errors.hasErrors) {
    res.status(STATUS_CODES.clientErrors.INVALID_REQUEST).json(errors);
  } else {
    next();
  }
};

export default getNotesValidations;

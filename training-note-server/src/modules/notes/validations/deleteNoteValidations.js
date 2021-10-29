import STATUS_CODES from '../../config/constants/statusCodes';

import { generateErrors, validateEmail } from 'utils/validations/common';

const deleteNotesValidations = (req, res, next) => {
  const errors = generateErrors();

  const { user } = req.params;

  const emailValidations = validateEmail(user);
  if (!emailValidations.isValid) {
    errors.hasErrors = true;
    errors.user = emailValidations.message;
  }

  if (errors.hasErrors) {
    res.status(STATUS_CODES.clientErrors.INVALID_REQUEST).json(errors);
  } else {
    next();
  }
};

export default deleteNotesValidations;

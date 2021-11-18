import STATUS_CODES from '../../config/constants/statusCodes';

import {
  validateDescription,
  validateTitle,
} from 'utils/validations/common';
import CommonError from 'errors/CommonError';

const addNoteValidations = (req, res, next) => {
  const { title, description } = req.body;

  const titleValidation = validateTitle(title);
  if (!titleValidation.isValid) {
    throw new CommonError(
      titleValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const descriptionValidation = validateDescription(description);
  if (!descriptionValidation.isValid) {
    throw new CommonError(
      descriptionValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default addNoteValidations;

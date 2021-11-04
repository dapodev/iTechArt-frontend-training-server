import STATUS_CODES from '../../config/constants/statusCodes';

import {
  validateDate,
  validateDescription,
  validateId,
  validateTitle,
} from 'utils/validations/common';
import CommonError from 'errors/CommonError';

const addNoteValidations = (req, res, next) => {
  const { id, title, description, createdAt, updatedAt } = req.body;

  const idValidation = validateId(id);
  if (!idValidation.isValid) {
    throw new CommonError(
      idValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

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

  const createdAtValidation = validateDate(createdAt, true);
  if (!createdAtValidation.isValid) {
    throw new CommonError(
      createdAtValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const updatedAtValidation = validateDate(updatedAt);
  if (!updatedAtValidation.isValid) {
    throw new CommonError(
      updatedAtValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default addNoteValidations;

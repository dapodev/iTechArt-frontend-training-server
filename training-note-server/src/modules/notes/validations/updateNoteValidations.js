import STATUS_CODES from 'modules/config/constants/statusCodes';
import CommonError from 'errors/CommonError';
import {
  validateId,
  validateTitle,
  validateDescription,
  validateDate,
} from 'utils/validations/common';

const updateNoteValidations = (req, res, next) => {
  const { title, description, createdAt, updatedAt } = req.body;
  const { id } = req.params;

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

export default updateNoteValidations;

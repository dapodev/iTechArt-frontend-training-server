import STATUS_CODES from 'modules/config/constants/statusCodes';
import CommonError from 'errors/CommonError';
import {
  validateTitle,
  validateDescription,
  validateId,
} from 'utils/validations/common';

const updateNoteValidations = (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const idValidations = validateId(id);
  if (!idValidations.isValid) {
    throw new CommonError(
      idValidations.message,
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

  next();
};

export default updateNoteValidations;

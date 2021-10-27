import STATUS_CODES from '../../config/constants/statusCodes';
import {
  generateErrors,
  validateDate,
  validateDescription,
  validateId,
  validateTitle,
} from './common';

const addNoteValidations = (req, res, next) => {
  const errors = generateErrors();

  const { id, title, description, createdAt, updatedAt } = req.body;

  const idValidation = validateId(id);
  if (!idValidation.isValid) {
    errors.hasErrors = true;
    errors.id = idValidation.message;
  }

  const titleValidation = validateTitle(title);
  if (!titleValidation.isValid) {
    errors.hasErrors = true;
    errors.title = titleValidation.message;
  }

  const descriptionValidation = validateDescription(description);
  if (!descriptionValidation.isValid) {
    errors.hasErrors = true;
    errors.description = descriptionValidation.message;
  }

  const createdAtValidation = validateDate(createdAt, true);
  if (!createdAtValidation.isValid) {
    errors.hasErrors = true;
    errors.createdAt = createdAtValidation.message;
  }

  const updatedAtValidation = validateDate(updatedAt);
  if (!updatedAtValidation.isValid) {
    errors.hasErrors = true;
    errors.updatedAt = updatedAtValidation.message;
  }

  if (errors.hasErrors) {
    res.status(STATUS_CODES.clientErrors.INVALID_REQUEST).json(errors);
  } else {
    next();
  }
};

export default addNoteValidations;

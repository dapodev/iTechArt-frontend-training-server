import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { validateId } from 'utils/validations/common';

const shareNoteValidations = (req, res, next) => {
  const { id } = req.params;
  const { users } = req.body;

  const idValidation = validateId(id);
  if (!idValidation.isValid) {
    throw new CommonError(
      idValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  if (users?.length) {
    users.forEach((email) => {
      if (typeof email !== 'string') {
        throw new CommonError(
          'Invalid instance in provided array of emails.',
          STATUS_CODES.clientErrors.INVALID_REQUEST
        );
      }
    });
  } else {
    throw new CommonError(
      'Array of users emails is not provided.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default shareNoteValidations;

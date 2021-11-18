import { validateEmails, validateId } from 'utils/validations/common';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';

const shareNoteValidations = (req, res, next) => {
  const { id } = req.params;
  const { users = [] } = req.body;

  const idValidations = validateId(id);
  if (!idValidations.isValid) {
    throw new CommonError(
      idValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const emailsValidations = validateEmails(users);
  if (!emailsValidations.isValid) {
    throw new CommonError(
      emailsValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default shareNoteValidations;

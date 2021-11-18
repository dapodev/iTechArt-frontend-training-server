import { validateId } from 'utils/validations/common';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';

const deleteNotesValidations = (req, res, next) => {
  const { id } = req.params;

  const idValidations = validateId(id);
  if (!idValidations.isValid) {
    throw new CommonError(
      idValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default deleteNotesValidations;

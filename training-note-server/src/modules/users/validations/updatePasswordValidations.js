import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { validatePassword } from 'utils/validations/common';

const updatePasswordValidations = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const oldPasswordValidations = validatePassword(oldPassword);
  if (!oldPasswordValidations.isValid) {
    throw new CommonError(
      oldPasswordValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const newPasswordValidations = validatePassword(newPassword);
  if (!newPasswordValidations.isValid) {
    throw new CommonError(
      newPasswordValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default updatePasswordValidations;

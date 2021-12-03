import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { getServerCurrentDateTime } from 'utils/dateTime';
import { validateDate, validateName } from 'utils/validations/common';

const updateUserValidations = (req, res, next) => {
  const { firstName, lastName, birthday } = req.body;

  const firstNameValidations = validateName(firstName);
  if (!firstNameValidations.isValid) {
    throw new CommonError(
      firstNameValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const lastNameValidations = validateName(lastName);
  if (!lastNameValidations.isValid) {
    throw new CommonError(
      lastNameValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const birthdayValidations = validateDate(birthday);
  if (!birthdayValidations.isValid) {
    throw new CommonError(
      birthdayValidations.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default updateUserValidations;

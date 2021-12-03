import STATUS_CODES from 'modules/config/constants/statusCodes';
import CommonError from 'errors/CommonError';
import {
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
} from 'utils/validations/common';

const registerUserValidations = (req, res, next) => {
  const { email, firstName, lastName, birthday, password } = req.body;

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    throw new CommonError(
      emailValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const firstNameValidation = validateName(firstName);
  if (!firstNameValidation.isValid) {
    throw new CommonError(
      firstNameValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const lastNameValidation = validateName(lastName);
  if (!lastNameValidation.isValid) {
    throw new CommonError(
      lastNameValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const birthdayValidation = validateDate(birthday, true);
  if (!birthdayValidation.isValid) {
    throw new CommonError(
      birthdayValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    throw new CommonError(
      passwordValidation.message,
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  next();
};

export default registerUserValidations;

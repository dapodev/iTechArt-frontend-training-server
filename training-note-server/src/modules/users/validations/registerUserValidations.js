import STATUS_CODES from 'modules/config/constants/statusCodes';
import {
  generateErrors,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
} from 'utils/validations/common';

const registerUserValidations = (req, res, next) => {
  const errors = generateErrors();

  const { email, firstName, lastName, birthday, password } = req.body;

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.hasErrors = true;
    errors.email = emailValidation.message;
  }

  const firstNameValidation = validateName(firstName);
  if (!firstNameValidation.isValid) {
    errors.hasErrors = true;
    errors.firstName = firstNameValidation.message;
  }

  const lastNameValidation = validateName(lastName);
  if (!lastNameValidation.isValid) {
    errors.hasErrors = true;
    errors.lastName = lastNameValidation.message;
  }

  const birthdayValidation = validateDate(birthday, true);
  if (!birthdayValidation.isValid) {
    errors.hasErrors = true;
    errors.birthday = birthdayValidation.message;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.hasErrors = true;
    errors.password = passwordValidation.message;
  }

  if (errors.hasErrors) {
    res.status(STATUS_CODES.clientErrors.INVALID_REQUEST).json(errors);
  } else {
    next();
  }
};

export default registerUserValidations;

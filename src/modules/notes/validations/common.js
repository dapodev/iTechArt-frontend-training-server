import {
  ID_PATTERN,
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from './constants';

export const generateErrors = () => {
  const errors = {};
  errors.hasErrors = false;

  return errors;
};

const generateValidationResult = () => {
  const result = {};
  result.isValid = true;
  result.message = '';

  return result;
};

export const validateId = (id) => {
  const result = generateValidationResult();

  switch (typeof id) {
    case 'number':
      if (id < 0) {
        result.isValid = false;
        result.message = "Note ID can't be a negative value.";
      }
      break;
    case 'string':
      if (ID_PATTERN.test(id)) {
        if (+id < 0) {
          result.isValid = false;
          result.message = "Note ID can't be a negative value.";
        }
      } else {
        result.isValid = false;
        result.message = "Note ID can't be converted to a number value.";
      }
      break;
    default:
      result.isValid = false;
      result.message = 'No note id provided.';
  }

  return result;
};

export const validateTitle = (title) => {
  const result = generateValidationResult();

  if (title === undefined) {
    result.isValid = false;
    result.message = 'No note title provided.';
  } else if (typeof title === 'string') {
    if (title.length < MIN_TITLE_LENGTH) {
      result.isValid = false;
      result.message = 'Note title is too short.';
    }
  } else {
    result.isValid = false;
    result.message = 'Note title is not a string.';
  }

  return result;
};

export const validateDescription = (description) => {
  const result = generateValidationResult();

  if (description === undefined) {
    result.isValid = false;
    result.message = 'No note description provided.';
  } else if (typeof description === 'string') {
    if (
      description.length < MIN_DESCRIPTION_LENGTH ||
      description.length > MAX_DESCRIPTION_LENGTH
    ) {
      result.isValid = false;
      result.message = `Note description has incorrect length(<${MIN_DESCRIPTION_LENGTH} or >${MAX_DESCRIPTION_LENGTH}).`;
    }
  } else {
    result.isValid = false;
    result.message = 'Note description is not a string.';
  }

  return result;
};

export const validateDate = (dateString, required = false) => {
  const result = generateValidationResult();

  if (dateString === undefined) {
    if (required) {
      result.isValid = false;
      result.message = 'No date value provided.';
    }
  } else {
    const parsed = Date.parse(dateString);
    if (Number.isNaN(parsed)) {
      result.isValid = false;
      result.message = 'Could not convert date value.';
    }
  }

  return result;
};

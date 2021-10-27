import { ID_PATTERN } from '../modules/notes/validations/constants';

export const isInteger = (value) => {
  switch (typeof value) {
    case 'number':
      return Number.isInteger(value);
    case 'string':
      return ID_PATTERN.test(value);
    default:
      return false;
  }
};

export const isDate = (value) => {
  let isCorrect = true;
  if (value === undefined) {
    isCorrect = false;
  } else {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      isCorrect = false;
    }
  }
  return isCorrect;
};

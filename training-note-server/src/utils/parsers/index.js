import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { isInteger } from 'utils/typeChecks';

const parsePage = (page) => {
  let result;

  if (isInteger(page)) {
    const parsedPageNumber = parseInt(page);

    if (parsedPageNumber > 0) {
      result = parsedPageNumber;
    }
  }

  if (!result) {
    throw new CommonError(
      'Provided page number has incorrect value.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return result;
};

const parseId = (id) => {
  let result;

  if (isInteger(id)) {
    const parsedId = parseInt(id);

    if (parsedId > 0) {
      result = parsedId;
    }
  }

  if (!result) {
    throw new CommonError(
      'Provided id has incorrect value.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return result;
};

export { parsePage, parseId };

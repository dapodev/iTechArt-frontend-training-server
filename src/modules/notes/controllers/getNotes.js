import STATUS_CODES from '../../config/constants/statusCodes';

import CommonError from 'errors/CommonError';
import { getNotesByPage } from 'db/providers/notes';
import { isInteger } from 'utils/typeChecks';

const getNotes = async (req, res, next) => {
  const { page = 1 } = req.query;

  const { dateFrom, dateTo, name } = req.query;
  const filters = { dateFrom, dateTo, name };

  try {
    let parsedPageNumber = isInteger(page) ? parseInt(page) : -1;
    if (parsedPageNumber > 0) {
      const notesPayload = await getNotesByPage(parsedPageNumber, filters);

      res.json(notesPayload);
    } else {
      throw new CommonError(
        'Provided page number has incorrect value.',
        STATUS_CODES.clientErrors.INVALID_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

export default getNotes;

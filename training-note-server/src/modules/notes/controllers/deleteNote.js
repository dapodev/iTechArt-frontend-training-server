import STATUS_CODES from '../../config/constants/statusCodes';

import CommonError from 'errors/CommonError';
import { isInteger } from 'utils/typeChecks';
import { removeNote as deleteNoteProvider } from 'db/providers/notes';

const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const { userData } = res.locals;

  // ! add validations ! parsing !
  try {
    if (isInteger(id)) {
      const parsedId = parseInt(id);
      const responseBody = { success: true, id: parsedId };

      try {
        const user = await userData;

        await deleteNoteProvider(user, parsedId);
      } catch {
        responseBody.success = false;
      } finally {
        res.json(responseBody);
      }
    } else {
      throw new CommonError(
        'Could not convert provided value to int.',
        STATUS_CODES.clientErrors.INVALID_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

export default deleteNote;

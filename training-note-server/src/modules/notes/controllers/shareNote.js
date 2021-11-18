import { shareNoteWithUsers } from 'db/providers/notes';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';

const shareNote = async (req, res, next) => {
  const { id } = req.params;
  const { users } = req.body;
  const { userData } = res.locals;

  try {
    if (users.includes(userData.email)) {
      throw new CommonError(
        'Note self sharing is not allowed.',
        STATUS_CODES.clientErrors.INVALID_REQUEST
      );
    }

    const sharedWith = await shareNoteWithUsers(userData, id, users);

    res.json(sharedWith);
  } catch (err) {
    next(err);
  }
};

export default shareNote;

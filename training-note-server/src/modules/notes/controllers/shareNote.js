import { shareNoteWithUsers } from 'db/providers/notes';

const shareNote = async (req, res, next) => {
  const { id } = req.params;
  const { users } = req.body;
  const { userData } = res.locals;

  const user = await userData;

  try {
    const sharedWith = await shareNoteWithUsers(user, id, users);

    //TODO: change it back to just array
    res.json({ emails: sharedWith });
  } catch (err) {
    next(err);
  }
};

export default shareNote;

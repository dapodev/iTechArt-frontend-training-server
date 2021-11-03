import { removeNote as deleteNoteProvider } from 'db/providers/notes';

const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const { userData } = res.locals;

  const user = await userData;
  const responseBody = { success: true, id: id };

  try {
    await deleteNoteProvider(user, id);

    res.json(responseBody);
  } catch (err) {
    next(err);
  }
};

export default deleteNote;

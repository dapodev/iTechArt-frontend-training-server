import { removeNote as deleteNoteProvider } from 'db/providers/notes';

const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const { userData } = res.locals;

  const responseBody = { success: true, id: id };

  try {
    await deleteNoteProvider(userData, id);
    res.json(responseBody);
  } catch (err) {
    next(err);
  }
};

export default deleteNote;

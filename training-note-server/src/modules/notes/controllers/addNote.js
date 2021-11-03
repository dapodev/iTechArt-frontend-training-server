import { insertNote as addNoteProvider } from 'db/providers/notes';

const addNote = async (req, res, next) => {
  const { id, title, description, createdAt, updatedAt } = req.body;
  const { userData } = res.locals;

  const note = {
    id: id,
    title: title,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };

  try {
    const user = await userData;

    const newNote = await addNoteProvider(user, note);

    res.json(newNote);
  } catch (err) {
    next(err);
  }
};

export default addNote;

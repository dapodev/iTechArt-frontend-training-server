import { insertNote as addNoteProvider } from 'db/providers/notes';

const addNote = async (req, res, next) => {
  const { id, title, description, createdAt, updatedAt } = req.body;

  const note = {
    id: parseInt(id),
    title: title,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };

  try {
    const newNote = await addNoteProvider(note);
    res.json(newNote);
  } catch (err) {
    next(err);
  }
};

export default addNote;

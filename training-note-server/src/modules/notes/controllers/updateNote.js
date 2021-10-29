import { updateNote as updateNoteProvider } from 'db/providers/notes';

const updateNote = async (req, res, next) => {
  const { title, description, createdAt, updatedAt } = req.body;
  const { id, user } = req.params;

  try {
    const parsedId = parseInt(id);

    const updatedNote = await updateNoteProvider(user, parsedId, {
      title,
      description,
      createdAt,
      updatedAt,
    });

    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

export default updateNote;

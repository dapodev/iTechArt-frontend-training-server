import { updateNote as updateNoteProvider } from 'db/providers/notes';

const updateNote = async (req, res, next) => {
  const { title, description, createdAt, updatedAt } = req.body;
  const { id } = req.params;
  const { userData } = res.locals;

  try {
    const user = await userData;

    const updatedNote = await updateNoteProvider(user, id, {
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

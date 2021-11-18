import { updateNote as updateNoteProvider } from 'db/providers/notes';

const updateNote = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const { userData } = res.locals;

  const user = await userData;

  try {
    const updatedNote = await updateNoteProvider(user, id, {
      title,
      description,
    });
    
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

export default updateNote;

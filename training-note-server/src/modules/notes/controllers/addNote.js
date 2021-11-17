import { insertNote as addNoteProvider } from 'db/providers/notes';

const addNote = async (req, res, next) => {
  const { title, description } = req.body;
  const { userData } = res.locals;

  const notePrimaryData = {
    title: title,
    description: description,
  };

  try {
    const user = await userData;

    const newNote = await addNoteProvider(user, notePrimaryData);

    res.json(newNote);
  } catch (err) {
    next(err);
  }
};

export default addNote;

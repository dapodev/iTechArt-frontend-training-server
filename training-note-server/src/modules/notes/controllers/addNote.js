import { insertNote as addNoteProvider } from 'db/providers/notes';
import { getServerCurrentDateTime } from 'utils/dateTime';

const addNote = async (req, res, next) => {
  const { title, description } = req.body;
  const { userData } = res.locals;

  const serverDateTime = getServerCurrentDateTime();

  const newNoteData = {
    title: title,
    description: description,
    createdAt: serverDateTime,
    sharedWith: [],
    author: userData._id,
  };

  try {
    const newNote = await addNoteProvider(userData, newNoteData);

    res.json(newNote);
  } catch (err) {
    next(err);
  }
};

export default addNote;

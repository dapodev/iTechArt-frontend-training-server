import { updateNote as updateNoteProvider } from 'db/providers/notes';
import { getServerCurrentDateTime } from 'utils/dateTime';

const updateNote = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const { userData } = res.locals;

  const serverDateTime = getServerCurrentDateTime();

  const updateData = {
    title,
    description,
    updatedAt: serverDateTime,
  };

  try {
    const updatedNote = await updateNoteProvider(userData, id, updateData);

    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

export default updateNote;

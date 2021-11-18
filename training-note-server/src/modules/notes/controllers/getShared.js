import { getSharedNotesByUser } from 'db/providers/notes';

const getShared = async (req, res, next) => {
  const { page } = req.query;
  const { userData } = res.locals;

  try {
    const notes = await getSharedNotesByUser(userData, page);

    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export default getShared;

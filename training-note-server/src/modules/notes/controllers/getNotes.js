import { getNotesByPage } from 'db/providers/notes';

const getNotes = async (req, res, next) => {
  const { page } = req.query;

  const { dateFrom, dateTo, name } = req.query;
  const filters = { dateFrom, dateTo, name };
  const { userData } = res.locals;

  try {
    const notes = await getNotesByPage(userData, page, filters);

    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export default getNotes;

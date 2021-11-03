import { getNotesByPage } from 'db/providers/notes';

const getNotes = async (req, res, next) => {
  const { page } = req.query;

  const { dateFrom, dateTo, name } = req.query;
  const filters = { dateFrom, dateTo, name };
  const { userData } = res.locals;

  try {
    const user = await userData;

    const notesPayload = (await getNotesByPage(user, page, filters)).map(
      (note) => {
        const { id, title, description, createdAt, updatedAt } = note;
        return { id, title, description, createdAt, updatedAt };
      }
    );

    res.json(notesPayload);
  } catch (err) {
    next(err);
  }
};

export default getNotes;

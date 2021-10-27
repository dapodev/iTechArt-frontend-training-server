import { getUserList } from 'db/providers/users';

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await getUserList();

    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export default getAllNotes;

import { parseId } from 'utils/parsers';

const deleteNoteParser = (req, res, next) => {
  const { id } = req.params;

  try {
    const parsedId = parseId(id);
    req.params.id = parsedId;
  } catch (err) {
    next(err);
  }

  next();
};

export default deleteNoteParser;

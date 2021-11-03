import { parseId } from 'utils/parsers';

const updateNoteParser = (req, res, next) => {
  const { id } = req.params;

  try {
    const parsedId = parseId(id);
    req.params.id = parsedId;
  } catch (err) {
    next(err);
  }
  
  next();
};

export default updateNoteParser;

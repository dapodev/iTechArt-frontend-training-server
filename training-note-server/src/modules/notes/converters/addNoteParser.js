const addNoteParser = (req, res, next) => {
  const { id } = req.body;
  const parsedNoteId = parseInt(id);

  req.body.id = parsedNoteId;

  next();
};

export default addNoteParser;

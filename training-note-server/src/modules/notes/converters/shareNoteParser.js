const shareNoteParser = (res, req, next) => {
  const { id } = res.params;

  try {
    const parsedId = parseInt(id);
    res.params.id = parsedId;
  } catch (err) {
    next(err);
  }

  next();
};

export default shareNoteParser;

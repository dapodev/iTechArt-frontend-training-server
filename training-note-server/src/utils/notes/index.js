const findNoteById = (notes, id) => {
  let result;

  notes.forEach((note) => {
    if (note.id === id) {
      result = note;
    }
  });

  return result;
};

export { findNoteById };

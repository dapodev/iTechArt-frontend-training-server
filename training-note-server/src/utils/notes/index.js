const findNoteById = (notes, id) => {
  let result;

  notes.forEach((note) => {
    if ((note.id === id && note?.deleted == false)) {
      result = note;
    }
  });

  return result;
};

export { findNoteById };

const findNoteById = (notes, id) => {
  let result;

  notes.forEach((note) => {
    if (note.id === id) {
      result = note;
      console.log('found');
    }
  });

  return result;
};

export { findNoteById };

const findNoteById = (notes, id) => {
  let result;

  notes.forEach((note) => {
    if (note.id === id) {
      result = note;
    }
  });

  return result;
};

const getFreeId = (notes) => {
  let searchId = 0;

  while (searchId < notes.length) {
    if (!notes.filter((note) => note.id === searchId).length) {
      break;
    }

    searchId++;
  }

  return searchId;
};

export { findNoteById, getFreeId };

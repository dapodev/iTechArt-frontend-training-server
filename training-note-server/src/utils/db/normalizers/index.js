const normalizeNoteList = (notes) =>
  notes.map((note) => {
    const { _id, title, description, createdAt, updatedAt, sharedWith } = note;
    return { id: _id, title, description, createdAt, updatedAt, sharedWith };
  });

const normalizeNote = (note) => {
  const { _id, title, description, createdAt, updatedAt } = note;
  return { id: _id, title, description, createdAt, updatedAt };
};

const normalizeSharedNoteList = (notes) =>
  notes.map((note) => {
    const { _id, title, description, createdAt, updatedAt, author } = note;
    return { id: _id, title, description, createdAt, updatedAt, author };
  });

export { normalizeNoteList, normalizeNote, normalizeSharedNoteList };

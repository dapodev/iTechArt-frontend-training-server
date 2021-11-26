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

const normalizeUserInfo = (user) => {
  const { email, firstName, lastName, birthday } = user;
  return { email, firstName, lastName, birthday };
};

export {
  normalizeNoteList,
  normalizeNote,
  normalizeSharedNoteList,
  normalizeUserInfo,
};

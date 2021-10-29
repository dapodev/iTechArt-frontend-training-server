import Note from '../models/Note';
import User from '../models/User';

import STATUS_CODES from 'modules/config/constants/statusCodes';
import CommonError from 'errors/CommonError';
import { PAGINATION_SIZE } from 'modules/config/constants';
import { isDate } from 'utils/typeChecks';
import { findNoteById } from 'utils/notes';

export const getAllNotes = async (userEmail) => {
  const user = await getUserByEmail(userEmail);

  const notes = getNotesByUser(user);

  return notes;
};

export const getNotesByPage = async (userEmail, page, filters) => {
  const user = await getUserByEmail(userEmail);

  const _ids = (await getNotesByUser(user, true)).map((note) => note._id);

  const resultNotes = await Note.find({
    deleted: false,
    title: {
      $regex: filters.name || '',
      $options: 'i',
    },
    createdAt: {
      $gte: new Date(isDate(filters.dateFrom) ? filters.dateFrom : null),
      $lte: isDate(filters.dateTo) ? new Date(filters.dateTo) : new Date(),
    },
    _id: {
      $in: _ids,
    },
  })
    .limit(PAGINATION_SIZE)
    .skip((page - 1) * PAGINATION_SIZE);

  return resultNotes;
};

export const insertNote = async (userEmail, note) => {
  const user = await getUserByEmail(userEmail);

  let insertedNote;

  await user.populate('notes');
  const originNote = findNoteById(user.notes, note.id);

  if (originNote) {
    throw new CommonError(
      'Insert: note with provided ID already exists',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  } else {
    insertedNote = await Note.create(note);
    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { notes: insertedNote._id } }
    );
  }

  const { id, title, description, createdAt, updatedAt } = insertedNote;

  const newNoteValues = { id, title, description, createdAt, updatedAt };

  return newNoteValues;
};

export const removeNote = async (userEmail, id) => {
  const user = await getUserByEmail(userEmail);

  const _id = await getObjectIdByUserNoteId(user, id);

  if (_id) {
    await Note.updateOne({ _id: _id, deleted: false }, { deleted: true });
  } else {
    throw new CommonError(
      'Delete: Could not find note with provided id.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const deletedNote = await Note.findOne({ _id: _id });

  return deletedNote;
};

export const updateNote = async (userEmail, noteId, data) => {
  const user = await getUserByEmail(userEmail);
  const _id = await getObjectIdByUserNoteId(user, noteId);

  if (_id) {
    await Note.updateOne(
      { _id: _id, deleted: false },
      {
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    );
  } else {
    throw new CommonError(
      'Update: No notes with provided ID found.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const updatedNote = await Note.findOne({ id: noteId, deleted: false });

  const { id, title, description, createdAt, updatedAt } = updatedNote;

  const newNoteValues = { id, title, description, createdAt, updatedAt };

  return newNoteValues;
};

const getNotesByUser = async (user, allFields = false) => {
  await user.populate({ path: 'notes', match: { deleted: false } });

  // extract only important fields and create an array
  const notes = allFields
    ? Array.from(user.notes)
    : Array.from(
        user.notes.map((note) => {
          const { id, title, description, createdAt, updatedAt } = note;
          return { id, title, description, createdAt, updatedAt };
        })
      );

  return notes;
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new CommonError(
      'User Search: could not find user with provided email.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return user;
};

const getObjectIdByUserNoteId = async (user, id) => {
  const notes = await getNotesByUser(user, true);

  const _id = findNoteById(notes, id)?._id;

  return _id;
};

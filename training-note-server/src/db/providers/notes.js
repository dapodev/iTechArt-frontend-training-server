import Note from '../models/Note';
import User from '../models/User';

import STATUS_CODES from 'modules/config/constants/statusCodes';
import { PAGINATION_SIZE } from 'modules/config/constants';
import CommonError from 'errors/CommonError';
import { isDate } from 'utils/typeChecks';
import { findNoteById } from 'utils/notes';

export const getAllNotes = async () => {
  return await Note.find({ deleted: false });
};

export const getNotesByPage = async (page, filters) => {
  const result = await Note.find({
    deleted: false,
    title: {
      $regex: filters.name || '',
      $options: 'i',
    },
    createdAt: {
      $gte: new Date(isDate(filters.dateFrom) ? filters.dateFrom : null),
      $lte: isDate(filters.dateTo) ? new Date(filters.dateTo) : new Date(),
    },
  })
    .limit(PAGINATION_SIZE)
    .skip((page - 1) * PAGINATION_SIZE);

  return result;
};

export const insertNote = async (userEmail, note) => {
  const user = await User.findOne({ email: userEmail });

  let insertedNote;

  if (user) {
    await user.populate('notes');

    const originNote = findNoteById(user.notes, note.id);

    if (originNote) {
      throw new CommonError('Insert: note with provided ID already exists', STATUS_CODES.clientErrors.INVALID_REQUEST);
    } else {
      insertedNote = await Note.create(note);
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { notes: insertedNote._id } }
      );
    }
  } else {
    throw new CommonError(
      'Insert: provided user email not found.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const { id, title, description, createdAt, updatedAt } = insertedNote;

  const newNoteValues = { id, title, description, createdAt, updatedAt };

  return newNoteValues;
};

export const removeNote = async (id) => {
  const noteToRemove = await Note.findOne({ id: id, deleted: false });

  if (noteToRemove) {
    await Note.updateOne(
      { id: noteToRemove.id, deleted: false },
      {
        deleted: true,
      }
    );
  } else {
    throw new CommonError(
      'Delete: No notes with provided ID found.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return noteToRemove;
};

export const updateNote = async (id, data) => {
  const originNote = await Note.findOne({ id: id, deleted: false });

  let updatedNote;

  if (originNote) {
    await Note.updateOne(
      { id: originNote.id, deleted: false },
      {
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    );

    updatedNote = Note.findOne({ id: id, deleted: false });
  } else {
    throw new CommonError(
      'Update: No notes with provided ID found.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return updatedNote;
};

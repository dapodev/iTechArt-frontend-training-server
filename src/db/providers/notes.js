import Note from '../models/Note';

import STATUS_CODES from 'modules/config/constants/statusCodes';
import { PAGINATION_SIZE } from 'modules/config/constants';
import CommonError from 'errors/CommonError';
import { isDate } from 'utils/typeChecks';

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

export const insertNote = async (note) => {
  const originNote = await Note.findOne({ id: note.id, deleted: false });

  let insertedNote;

  if (originNote) {
    throw new CommonError(
      'Insert: ID already exists.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  } else {
    insertedNote = await Note.create(note);
  }

  return insertedNote;
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

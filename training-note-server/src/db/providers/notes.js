import Note from '../models/Note';
import User from '../models/User';
import { getUserByEmail } from './users';

import STATUS_CODES from 'modules/config/constants/statusCodes';
import CommonError from 'errors/CommonError';
import { PAGINATION_SIZE } from 'modules/config/constants';
import { isDate } from 'utils/typeChecks';
import { findNoteById, getFreeId } from 'utils/notes';
import { getServerCurrentDateTime } from 'utils/dateTime';

export const getAllNotes = async (userData) => {
  const user = userData;

  const notes = getNotesByUser(user);

  return notes;
};

export const getNotesByPage = async (userData, page, filters) => {
  const user = userData;

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

export const insertNote = async (userData, noteData) => {
  const user = userData;

  let insertedNote;

  const notes = await getNotesByUser(user);

  const availableId = getFreeId(notes);
  const serverDateTime = getServerCurrentDateTime();

  const newNoteData = {
    id: availableId,
    title: noteData.title,
    description: noteData.description,
    createdAt: serverDateTime,
    author: user._id,
    sharedWith: [],
  };

  insertedNote = await Note.create(newNoteData);
  await User.findOneAndUpdate(
    { _id: user._id },
    { $push: { notes: insertedNote._id } }
  );

  const { id, title, description, createdAt } = insertedNote;

  const newNoteValues = {
    id,
    title,
    description,
    createdAt,
  };

  return newNoteValues;
};

export const removeNote = async (userData, id) => {
  const user = userData;

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

export const updateNote = async (userData, noteId, data) => {
  const user = userData;
  const _id = await getObjectIdByUserNoteId(user, noteId);

  const serverDateTime = getServerCurrentDateTime();

  if (_id) {
    await Note.updateOne(
      { _id: _id, deleted: false },
      {
        title: data.title,
        description: data.description,
        updatedAt: serverDateTime,
      }
    );
  } else {
    throw new CommonError(
      'Update: No notes with provided ID found.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const updatedNote = await Note.findOne({ _id: _id });

  const { id, title, description, createdAt, updatedAt } = updatedNote;

  const newNoteValues = { id, title, description, createdAt, updatedAt };

  return newNoteValues;
};

export const shareNoteWithUsers = async (userData, id, emails) => {
  const user = userData;

  if (emails.includes(user.email)) {
    throw new CommonError(
      'Note self sharing is not allowed.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  const _id = await getObjectIdByUserNoteId(user, id);

  let sharedWith = [];

  if (_id) {
    const noteToShare = await Note.findOne({ _id: _id, deleted: false });
    const sharedEmailList = noteToShare.sharedWith;

    const emailsToShareWith = [];

    // check if all of provided users exist
    // and remove all duplicates
    for (const email of emails) {
      await getUserByEmail(email);

      if (
        !(sharedEmailList.includes(email) || emailsToShareWith.includes(email))
      ) {
        emailsToShareWith.push(email);
      }
    }

    await Note.updateOne(
      { _id: _id, deleted: false },
      {
        $push: {
          sharedWith: {
            $each: emailsToShareWith,
          },
        },
      }
    );

    sharedWith = emailsToShareWith;
  } else {
    throw new CommonError(
      'Could not find note with provided id.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return sharedWith;
};

export const getSharedNotesByUser = async (userData, page) => {
  const user = userData;

  const userEmail = user.email;

  const notes = await Note.find({ deleted: false, sharedWith: userEmail })
    .limit(PAGINATION_SIZE)
    .skip((page - 1) * PAGINATION_SIZE);

  const mappedNotes = await Promise.all(
    notes.map(async (note) => {
      const { id, title, description, createdAt, updatedAt } = note;
      const author_id = note.author;

      const author = (await User.findOne({ _id: author_id }))?.email;

      return {
        id,
        title,
        description,
        createdAt,
        updatedAt,
        author,
      };
    })
  );

  return mappedNotes;
};

const getNotesByUser = async (user, allFields = false) => {
  await user.populate({ path: 'notes', match: { deleted: false } });

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

export const getObjectIdByUserNoteId = async (user, id) => {
  const notes = await getNotesByUser(user, true);

  const _id = findNoteById(notes, id)?._id;

  return _id;
};

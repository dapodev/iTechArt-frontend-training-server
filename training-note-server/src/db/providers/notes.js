import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { PAGINATION_SIZE } from 'modules/config/constants';
import { isDate } from 'utils/typeChecks';
import {
  normalizeNote,
  normalizeNoteList,
  normalizeSharedNoteList,
} from 'utils/db/normalizers';

import Note from '../models/Note';
import User from '../models/User';
import { getUserByEmail } from './users';

export const getNotesByPage = async (user, page, filters) => {
  const resultNotes = await getNotesByUserQuery(user)
    .find({
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

  return normalizeNoteList(resultNotes);
};

export const insertNote = async (user, noteData) => {
  const insertedNote = await Note.create(noteData);
  await User.findOneAndUpdate(
    { _id: user._id },
    { $push: { notes: insertedNote._id } }
  );

  return normalizeNote(insertedNote);
};

export const removeNote = async (user, id) => {
  const note = await getNoteById(user, id);

  await Note.updateOne({ _id: note._id, deleted: false }, { deleted: true });

  return normalizeNote(note);
};

export const updateNote = async (user, id, updateData) => {
  const note = await getNoteById(user, id);

  const { title, description, updatedAt } = updateData;

  await Note.updateOne(
    { _id: note._id },
    {
      title: title,
      description: description,
      updatedAt: updatedAt,
    }
  );

  const updatedNote = await Note.findOne({ _id: note._id });

  return normalizeNote(updatedNote);
};

export const shareNoteWithUsers = async (user, id, emails) => {
  const noteToShare = await getNoteById(user, id);
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
    { _id: noteToShare._id, deleted: false },
    {
      $push: {
        sharedWith: {
          $each: emailsToShareWith,
        },
      },
    }
  );

  return emailsToShareWith;
};

export const getSharedNotesByUser = async (user, page) => {
  const notes = await Note.find({ deleted: false, sharedWith: user.email })
    .limit(PAGINATION_SIZE)
    .skip((page - 1) * PAGINATION_SIZE);

  const mappedNotes = await Promise.all(
    notes.map(async (note) => {
      const author_id = note.author;

      const author = (await User.findOne({ _id: author_id }))?.email;

      const { _id, title, description, createdAt, updatedAt, sharedWith } =
        note;

      return {
        _id,
        title,
        description,
        createdAt,
        updatedAt,
        sharedWith,
        author: author,
      };
    })
  );

  return normalizeSharedNoteList(mappedNotes);
};

const getNotesByUserQuery = (user) => {
  return Note.find({ deleted: false, author: user._id });
};

const getNoteById = async (user, id) => {
  const note = await getNotesByUserQuery(user).findOne({ _id: id });

  if (!note) {
    throw new CommonError(
      'Note Search: could not find note with provided id.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return note;
};

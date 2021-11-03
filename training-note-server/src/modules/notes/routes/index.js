import express from 'express';

import {
  addNoteValidations,
  deleteNotesValidations,
  getNotesValidations,
  updateNoteValidations,
} from '../validations';
import { getNotes, addNote, deleteNote, updateNote } from '../controllers';
import {
  addNoteParser,
  deleteNoteParser,
  getNotesParser,
  updateNoteParser,
} from '../converters';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';
import internalErrorHandler from 'errors/handlers/internalErrorHandler';
import userAuthorization from 'auth';

const notesRouter = express.Router();

notesRouter.use(connect);

notesRouter.use(userAuthorization);

notesRouter.get('/', [getNotesValidations, getNotesParser, getNotes]);

notesRouter.post('/', [addNoteValidations, addNoteParser, addNote]);

notesRouter.put('/:id', [updateNoteValidations, updateNoteParser, updateNote]);

notesRouter.delete('/:id', [
  deleteNotesValidations,
  deleteNoteParser,
  deleteNote,
]);

notesRouter.use([commonErrorHandler, internalErrorHandler]);

export default notesRouter;

import express from 'express';

import {
  addNoteValidations,
  deleteNotesValidations,
  getNotesValidations,
  updateNoteValidations,
} from '../validations';
import { getNotes, addNote, deleteNote, updateNote } from '../controllers';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';
import internalErrorHandler from 'errors/handlers/internalErrorHandler';
import userAuthorization from 'auth';

const notesRouter = express.Router();

notesRouter.use(connect);

notesRouter.use(userAuthorization);

notesRouter.get('/', getNotesValidations, getNotes);

notesRouter.post('/', addNoteValidations, addNote);

notesRouter.put('/:id', updateNoteValidations, updateNote);

notesRouter.delete('/:id', deleteNotesValidations, deleteNote);

notesRouter.use([commonErrorHandler, internalErrorHandler]);

export default notesRouter;

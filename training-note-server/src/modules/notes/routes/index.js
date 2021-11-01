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

notesRouter.get('/:user', getNotesValidations, getNotes);

notesRouter.post('/:user', addNoteValidations, addNote);

notesRouter.put('/:user/:id', updateNoteValidations, updateNote);

notesRouter.delete('/:user/:id', deleteNotesValidations, deleteNote);

notesRouter.use([commonErrorHandler, internalErrorHandler]);

export default notesRouter;

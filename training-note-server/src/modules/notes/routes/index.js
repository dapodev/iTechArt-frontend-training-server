import express from 'express';

import {
  addNoteValidations,
  deleteNotesValidations,
  shareNoteValidations,
  updateNoteValidations,
} from '../validations';
import {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
  shareNote,
  getShared,
} from '../controllers';
import {
  addNoteParser,
  deleteNoteParser,
  getNotesParser,
  getSharedParser,
  shareNoteParser,
  updateNoteParser,
} from '../converters';

import connect from 'db/connection/connect';
import { jwtAuth } from 'auth';

const notesRouter = express.Router();

notesRouter.use(connect);

notesRouter.use(jwtAuth);

notesRouter.get('/', [getNotesParser, getNotes]);

notesRouter.post('/', [addNoteValidations, addNoteParser, addNote]);

notesRouter.put('/:id', [updateNoteValidations, updateNoteParser, updateNote]);

notesRouter.delete('/:id', [
  deleteNotesValidations,
  deleteNoteParser,
  deleteNote,
]);

notesRouter.put('/share/:id', [
  shareNoteValidations,
  shareNoteParser,
  shareNote,
]);

notesRouter.get('/share', [getSharedParser, getShared]);

export default notesRouter;

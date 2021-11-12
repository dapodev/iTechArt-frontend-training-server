import express from 'express';

import {
  addNoteValidations,
  shareNoteValidations,
  updateNoteValidations,
} from '../validations';
import {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
  shareNote,
} from '../controllers';
import {
  addNoteParser,
  deleteNoteParser,
  getNotesParser,
  shareNoteParser,
  updateNoteParser,
} from '../converters';

import connect from 'db/connection/connect';
import userAuthorization from 'auth';

const notesRouter = express.Router();

notesRouter.use(connect);

notesRouter.use(userAuthorization);

notesRouter.get('/', [getNotesParser, getNotes]);

notesRouter.post('/', [addNoteValidations, addNoteParser, addNote]);

notesRouter.put('/:id', [updateNoteValidations, updateNoteParser, updateNote]);

notesRouter.put('/share/:id', [
  shareNoteValidations,
  shareNoteParser,
  shareNote,
]);

notesRouter.delete('/:id', [deleteNoteParser, deleteNote]);

export default notesRouter;

import express from 'express';

import { addNoteValidations, updateNoteValidations } from '../validations';
import { getNotes, addNote, deleteNote, updateNote } from '../controllers';
import {
  addNoteParser,
  deleteNoteParser,
  getNotesParser,
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

notesRouter.delete('/:id', [deleteNoteParser, deleteNote]);

export default notesRouter;

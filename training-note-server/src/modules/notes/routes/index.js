import express from 'express';

import { addNoteValidations, updateNoteValidations } from '../validations';
import { getNotes, addNote, deleteNote, updateNote } from '../controllers';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';
import internalErrorHandler from 'errors/handlers/internalErrorHandler';

const notesRouter = express.Router();

notesRouter.use(connect);

notesRouter.get('/:user', getNotes);

notesRouter.post('/:user', addNoteValidations, addNote);

notesRouter.put('/:user/:id', updateNoteValidations, updateNote);

notesRouter.delete('/:user/:id', deleteNote);

notesRouter.use([commonErrorHandler, internalErrorHandler]);

export default notesRouter;

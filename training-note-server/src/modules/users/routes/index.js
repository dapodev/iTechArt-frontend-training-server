import express from 'express';

import registerUserValidations from '../validations/registerUserValidations';
import { getAllNotes, registerUser } from '../controllers';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';

const usersRouter = express.Router();

usersRouter.use(connect);

usersRouter.get('/', getAllNotes);

usersRouter.post('/', registerUserValidations, registerUser);

usersRouter.use(commonErrorHandler);

export default usersRouter;

import express from 'express';

import registerUserValidations from '../validations/registerUserValidations';
import { getAllUsers, registerUser } from '../controllers';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';

const usersRouter = express.Router();

usersRouter.use(connect);

usersRouter.get('/', getAllUsers);

usersRouter.post('/', registerUserValidations, registerUser);

usersRouter.use(commonErrorHandler);

export default usersRouter;

import express from 'express';

import registerUserValidations from '../validations/registerUserValidations';
import { getAllUsers, registerUser } from '../controllers';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';
import userAuthorization from 'auth';
import { authentificateUser } from '../controllers';

const usersRouter = express.Router();

usersRouter.use(connect);

usersRouter.use(userAuthorization);

usersRouter.get('/', getAllUsers);

usersRouter.post('/', registerUserValidations, registerUser);

usersRouter.post('/auth', authentificateUser);

usersRouter.use(commonErrorHandler);

export default usersRouter;

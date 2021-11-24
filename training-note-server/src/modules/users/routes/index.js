import express from 'express';

import registerUserValidations from '../validations/registerUserValidations';
import { getAllUsers, registerUser } from '../controllers';
import { authentificateUser } from '../controllers';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';
import internalErrorHandler from 'errors/handlers/internalErrorHandler';
import { jwtAuth } from 'auth';

const usersRouter = express.Router();

usersRouter.use(connect);

usersRouter.post('/', registerUserValidations, registerUser);

usersRouter.post('/auth', authentificateUser);

usersRouter.use(jwtAuth);

usersRouter.get('/', getAllUsers);

usersRouter.use([commonErrorHandler, internalErrorHandler]);

export default usersRouter;

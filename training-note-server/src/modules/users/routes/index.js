import express from 'express';
import { jwtAuth } from 'auth';

import {
  getAllUsers,
  registerUser,
  updateUser,
  authentificateUser,
  updatePassword,
} from '../controllers';
import {
  updateUserValidations,
  registerUserValidations,
  updatePasswordValidations,
} from '../validations';

import connect from 'db/connection/connect';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';
import internalErrorHandler from 'errors/handlers/internalErrorHandler';

const usersRouter = express.Router();

usersRouter.use(connect);

usersRouter.post('/', registerUserValidations, registerUser);

usersRouter.post('/auth', authentificateUser);

usersRouter.use(jwtAuth);

usersRouter.get('/', getAllUsers);

usersRouter.put('/', [updateUserValidations, updateUser]);

usersRouter.put('/password', [updatePasswordValidations, updatePassword]);

usersRouter.use([commonErrorHandler, internalErrorHandler]);

export default usersRouter;

import swaggerUI from 'swagger-ui-express';
import swaggerDoucument from '../swagger.json';
import express from 'express';
import cors from 'cors';
const app = express();

import notesRouter from './modules/notes/routes';
import requestLog from './utils/log/requestLog';
import { PORT } from './config/constants';
import usersRouter from 'modules/users/routes';
import commonErrorHandler from 'errors/handlers/commonErrorHandler';
import internalErrorHandler from '../build/errors/handlers/internalErrorHandler';

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoucument));

app.use(cors());
app.use(express.json());

app.use(requestLog);

app.use('/api/users', usersRouter);

app.use('/api/notes', notesRouter);

app.use(commonErrorHandler, internalErrorHandler);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

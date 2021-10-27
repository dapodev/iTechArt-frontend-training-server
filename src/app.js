import swaggerUI from 'swagger-ui-express';
import swaggerDoucument from '../swagger.json';
import express from 'express';
import cors from 'cors';
const app = express();

import greetingRouter from './modules/greeting/routes';
import notesRouter from './modules/notes/routes';
import requestLog from './utils/log/requestLog';
import { PORT } from './config/constants';

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoucument));

app.use(cors());
app.use(express.json());

app.use(requestLog);

app.use('/api/greetings', greetingRouter);

app.use('/api/notes', notesRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

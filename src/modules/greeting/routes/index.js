import express from 'express';

import greeting from '../controllers/greeting';

const greetingRouter = express.Router();

greetingRouter.get('/', greeting);

export default greetingRouter;
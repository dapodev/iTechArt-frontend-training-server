import jwt from 'jsonwebtoken';

import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { getUserByEmail } from 'db/providers/users';

const jwtAuth = async (req, res, next) => {
  const key = process.env.SECRET_KEY;

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new CommonError(
        'Auth Token was not provided.',
        STATUS_CODES.clientErrors.UNAUTHORIZED
      );
    }

    const { email } = jwt.verify(token, key);
    const userInfo = await getUserByEmail(email);
    res.locals.userData = userInfo;

    next();
  } catch (err) {
    const errorPayload =
      err instanceof CommonError
        ? err
        : new CommonError(
            'Auth token is invalid.',
            STATUS_CODES.clientErrors.FORBIDDEN
          );

    next(errorPayload);
  }
};

export default jwtAuth;

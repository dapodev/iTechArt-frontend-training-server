import auth from 'basic-auth';

import { isAccessGranted } from './common';

import { getUserByEmail } from 'db/providers/users';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';

const basicAuth = async (req, res, next) => {
  const credentials = auth(req);
  try {
    if (credentials?.name && credentials?.pass) {
      const accessGranted = await isAccessGranted(
        credentials.name,
        credentials.pass
      );

      if (accessGranted) {
        const userInfo = await getUserByEmail(credentials.name);
        res.locals.userData = userInfo;

        next();
      } else {
        throw new CommonError(
          'Authorization error: invalid credentials',
          STATUS_CODES.clientErrors.UNAUTHORIZED
        );
      }
    } else {
      throw new CommonError(
        'No auth data provided.',
        STATUS_CODES.clientErrors.UNAUTHORIZED
      );
    }
  } catch (err) {
    next(err);
  }
};

export default basicAuth;

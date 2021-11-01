import auth from 'basic-auth';
import safeCompare from 'tsscmp';

import { getUserByEmail } from 'db/providers/users';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { generateMD5fromString } from 'utils/hash';

const userAuthorization = async (req, res, next) => {
  const credentials = auth(req);
  try {
    if (credentials?.name && credentials?.pass) {
      const accessGranted = await isAccessGranted(
        credentials.name,
        credentials.pass
      );
      if (accessGranted) {
        request.next();
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

const isAccessGranted = async (email, password) => {
  let hasAccess = true;

  const hashedPassword = generateMD5fromString(password);

  const user = await getUserByEmail(email);

  hasAccess = safeCompare(email, user.email) && hasAccess;
  hasAccess = safeCompare(hashedPassword, user.password) && hasAccess;

  return hasAccess;
};

export default userAuthorization;

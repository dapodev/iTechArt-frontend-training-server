import { isAccessGranted } from 'auth/common';
import generateRefreshToken from 'auth/generateRefreshToken';
import generateToken from 'auth/generateToken';
import { getUserByEmail, setRefreshToken } from 'db/providers/users';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';

const authentificateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      throw new CommonError(
        'No auth data provided.',
        STATUS_CODES.clientErrors.UNAUTHORIZED
      );
    }

    const accessGranted = await isAccessGranted(email, password);

    if (!accessGranted) {
      throw new CommonError(
        'Authorization error: invalid credentials',
        STATUS_CODES.clientErrors.UNAUTHORIZED
      );
    }
    const user = await getUserByEmail(email);
    const { birthday, firstName, lastName } = user;
    const userInfoPayload = { email, birthday, firstName, lastName };

    const token = generateToken(email);
    const refreshToken = generateRefreshToken(email);

    await setRefreshToken(user, refreshToken);

    const responsePayload = { token, refreshToken, user: userInfoPayload };

    res.json(responsePayload);
  } catch (err) {
    next(err);
  }
};

export default authentificateUser;

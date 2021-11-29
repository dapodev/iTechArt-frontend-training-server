import jwt from 'jsonwebtoken';
import safeCompare from 'tsscmp';

import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { getUserByEmail, setRefreshToken } from 'db/providers/users';
import generateRefreshToken from 'auth/generateRefreshToken';
import generateToken from 'auth/generateToken';

const refreshTokens = async (req, res, next) => {
  const key = process.env.REFRESH_SECRET_KEY;
  const { refreshToken: providedRefreshToken } = req.body;

  try {
    const { email } = jwt.verify(providedRefreshToken, key);

    const user = await getUserByEmail(email);

    const isValidRefresh = providedRefreshToken === user.refreshToken;
    if (!isValidRefresh) {
      throw new CommonError(
        'Refresh token is invalid.',
        STATUS_CODES.clientErrors.FORBIDDEN
      );
    }

    const token = generateToken(email);
    const newRefreshToken = generateRefreshToken(email);

    const refreshToken = await setRefreshToken(user, newRefreshToken);

    res.json({ token, refreshToken });
  } catch (err) {
    const errorPayload =
      err instanceof CommonError
        ? err
        : new CommonError(
            'Refresh token is invalid.',
            STATUS_CODES.clientErrors.FORBIDDEN
          );
    next(errorPayload);
  }
};

export default refreshTokens;

import { isAccessGranted } from 'auth/common';
import generateToken from 'auth/generateToken';
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

    const token = generateToken(email);

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export default authentificateUser;

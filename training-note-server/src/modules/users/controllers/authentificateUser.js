import { getUserByEmail } from 'db/providers/users';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { generateMD5fromString } from 'utils/hash';

const authentificateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //rewrite! but it works!~
    const user = await getUserByEmail(email);
    const hashedPassword = generateMD5fromString(password);

    if (user.password === hashedPassword) {
      const { email, password, firstName, lastName, birthday } = user;

      res.json({ email, password, firstName, lastName, birthday });
    } else {
      throw new CommonError(
        'Authentification: Password rejected.',
        STATUS_CODES.clientErrors.INVALID_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

export default authentificateUser;

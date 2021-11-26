import { isAccessGranted } from 'auth/common';
import { updateUserPassword } from 'db/providers/users';
import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { generateMD5fromString } from 'utils/hash';

const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { userData: user } = res.locals;

  try {
    const hasAccess = await isAccessGranted(user.email, oldPassword);

    if (!hasAccess) {
      throw new CommonError(
        "Old password value doesn't match existing user password.",
        STATUS_CODES.clientErrors.INVALID_REQUEST
      );
    }

    const newPasswordHash = generateMD5fromString(newPassword);

    const result = await updateUserPassword(user, newPasswordHash);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default updatePassword;

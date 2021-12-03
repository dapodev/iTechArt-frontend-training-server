import safeCompare from 'tsscmp';

import { generateMD5fromString } from 'utils/hash';
import { getUserByEmail } from 'db/providers/users';

const isAccessGranted = async (email, password) => {
  let hasAccess = true;

  const hashedPassword = generateMD5fromString(password);

  const user = await getUserByEmail(email);

  hasAccess = safeCompare(email, user.email) && hasAccess;
  hasAccess = safeCompare(hashedPassword, user.password) && hasAccess;

  return hasAccess;
};

export { isAccessGranted };

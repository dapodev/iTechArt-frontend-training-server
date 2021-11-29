import jwt from 'jsonwebtoken';

import { REFRESH_TOKEN_LIFE_TIME } from 'config/constants';

const generateRefreshToken = (email) => {
  const key = process.env.REFRESH_SECRET_KEY;

  const payload = { email };

  const token = jwt.sign(payload, key, { expiresIn: REFRESH_TOKEN_LIFE_TIME });

  return token;
};

export default generateRefreshToken;

import jwt from 'jsonwebtoken';

import { TOKEN_LIFE_TIME } from 'config/constants';

const generateToken = (email) => {
  const key = process.env.SECRET_KEY;

  const payload = { email };

  const token = jwt.sign(payload, key, { expiresIn: TOKEN_LIFE_TIME });

  return token;
};

export default generateToken;

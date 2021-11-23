import jwt from 'jsonwebtoken';

const generateToken = (email) => {
  const key = process.env.SECRET_KEY;

  const payload = { email };

  const token = jwt.sign(payload, key, { expiresIn: '3h' });

  return token;
};

export default generateToken;

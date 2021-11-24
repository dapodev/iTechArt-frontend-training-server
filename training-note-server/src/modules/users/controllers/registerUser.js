import generateToken from 'auth/generateToken';
import { addUser } from 'db/providers/users';

const registerUser = async (req, res, next) => {
  const { email, firstName, lastName, birthday, password } = req.body;
  const newUserData = { email, firstName, lastName, birthday, password };

  try {
    const newUser = await addUser(newUserData);

    const token = generateToken(newUser.email);

    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

export default registerUser;

import { addUser } from 'db/providers/users';

const registerUser = async (req, res, next) => {
  const { email, firstName, lastName, birthday, password } = req.body;
  const userData = { email, firstName, lastName, birthday, password };

  try {
    const newUser = await addUser(userData);

    res.json(newUser);
  } catch (err) {
    next(err);
  }
};

export default registerUser;

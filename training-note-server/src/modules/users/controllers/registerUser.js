import generateRefreshToken from 'auth/generateRefreshToken';
import generateToken from 'auth/generateToken';
import { addUser, getUserByEmail, setRefreshToken } from 'db/providers/users';

const registerUser = async (req, res, next) => {
  const { email, firstName, lastName, birthday, password } = req.body;
  const newUserData = { email, firstName, lastName, birthday, password };

  try {
    const newUser = await addUser(newUserData);

    const userInfoPayload = {
      email,
      birthday: newUser.birthday,
      firstName,
      lastName,
    };

    const token = generateToken(newUser.email);
    const refreshToken = generateRefreshToken(newUser.email);

    const user = await getUserByEmail(email);
    await setRefreshToken(user, refreshToken);

    const responsePayload = { token, refreshToken, user: userInfoPayload };

    res.json(responsePayload);
  } catch (err) {
    next(err);
  }
};

export default registerUser;

import { updateUserInfo } from 'db/providers/users';

const updateUser = async (req, res, next) => {
  const { userData: user } = res.locals;
  const { firstName, lastName, birthday } = req.body;

  const newInfoPayload = { firstName, lastName, birthday };

  try {
    const result = await updateUserInfo(user, newInfoPayload);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default updateUser;

import { getUserList } from 'db/providers/users';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getUserList();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export default getAllUsers;

import User from '../models/User';

import CommonError from 'errors/CommonError';
import STATUS_CODES from 'modules/config/constants/statusCodes';
import { generateMD5fromString } from 'utils/hash';
import { normalizeUserInfo } from 'utils/db/normalizers';

const getUserList = async () => {
  const notes = await User.find({}).select(
    '-_id email firstName lastName birthday password'
  );

  return notes;
};

const addUser = async (user) => {
  let insertedData;

  const originUser = await User.findOne({
    email: user.email,
  });

  if (originUser) {
    throw new CommonError(
      'Insert: user with provided email already exists.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  } else {
    insertedData = await User.create({
      ...user,
      password: generateMD5fromString(user.password),
    });
  }

  const { email, firstName, lastName, birthday, password } = insertedData;

  const newUser = { email, firstName, lastName, birthday, password };

  return newUser;
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new CommonError(
      'User Search: could not find user with provided email.',
      STATUS_CODES.clientErrors.INVALID_REQUEST
    );
  }

  return user;
};

const updateUserInfo = async (user, data) => {
  const { firstName, lastName, birthday } = data;

  const result = await User.findOneAndUpdate(
    { _id: user._id },
    { firstName, lastName, birthday },
    { new: true }
  );

  return normalizeUserInfo(result);
};

const updateUserPassword = async (user, password) => {
  const result = await User.findOneAndUpdate(
    { _id: user._id },
    { password: password },
    { new: true }
  );

  return normalizeUserInfo(result);
};

const setRefreshToken = async (user, token) => {
  user.refreshToken = token;
  await user.save();

  return token;
};

export {
  getUserList,
  addUser,
  getUserByEmail,
  updateUserInfo,
  updateUserPassword,
  setRefreshToken,
};

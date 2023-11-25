import { tUsers } from './user.interface';
import { users } from './user.model';

const createUserDB = async (userData: tUsers) => {
  if (await users.isUserExists(userData.userId)) {
    throw new Error('user already exists');
  }
  const result = await users.create(userData);

  return result;
};

const getAllUsersDB = async () => {
  const result = await users.find().select({
    userName: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUsersDB = async (userId: number) => {
  if (await users.isUserExists(userId)) {
    const result = await users.findOne({ userId });
    return result;
  } else {
    throw new Error('user already exists');
  }
};

const updateUsersDB = async (userId: number, userData: tUsers) => {
  const result = await users.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUsersDB = async (userId: number) => {
  const result = await users.findOneAndDelete({ userId });
  return result;
};

export const userServices = {
  createUserDB,
  getAllUsersDB,
  getSingleUsersDB,
  updateUsersDB,
  deleteUsersDB,
};

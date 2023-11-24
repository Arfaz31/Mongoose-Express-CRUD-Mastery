import { tUsers } from './user.interface';
import { userModel } from './user.model';

const createUserDB = async (userData: tUsers) => {
  const result = await userModel.create(userData);
  return result;
};

const getAllUsersDB = async () => {
  const result = await userModel
    .find()
    .select({ userName: 1, fullName: 1, age: 1, email: 1, address: 1 });
  return result;
};

const getSingleUsersDB = async (userId: number) => {
  const result = await userModel.findOne({ userId });
  return result;
};

export const userServices = {
  createUserDB,
  getAllUsersDB,
  getSingleUsersDB,
};

import { tUsers } from './user.interface';
import { userModel } from './user.model';

const createUserDB = async (userData: tUsers) => {
  const result = await userModel.create(userData);
  return result;
};

export const userServices = {
  createUserDB,
};

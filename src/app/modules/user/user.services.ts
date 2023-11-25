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
    throw new Error('User not found');
  }
};

const updateUsersDB = async (userId: number, userData: tUsers) => {
  if (await users.isUserExists(userId)) {
    const result = await users.findOneAndUpdate({ userId }, userData, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    throw new Error('User not found');
  }
};

const deleteUsersDB = async (userId: number) => {
  if (await users.isUserExists(userId)) {
    const result = await users.findOneAndDelete({ userId });
    return result;
  } else {
    throw new Error('User not found');
  }
};

//update order data
const orderDataPutDB = async (userId: number, userOrder: tUsers) => {
  if (await users.isUserExists(userId)) {
    const result = await users.updateOne(
      { userId },
      { $set: { orders: userOrder.orders } },
      {
        new: true,
        runValidators: true,
      },
    );
    return result;
  } else {
    throw new Error('User not found');
  }
};

//GetAllOrdersFromSpecificUsersDB
const GetAllOrdersFromSpecificUsersDB = async (userId: number) => {
  if (await users.isUserExists(userId)) {
    const result = await users.findOne({ userId }).select({ orders: 1 });
    return result;
  } else {
    throw new Error('User not found');
  }
};

//total price of order for a specific users
const GetTotalPriceOrdersUsersDB = async (userId: number) => {
  if (await users.isUserExists(userId)) {
    const result = await users.aggregate([
      {
        $match: { userId: userId },
      },
      { $unwind: '$orders' },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
        },
      },
    ]);
    return result;
  } else {
    throw new Error('User not found');
  }
};

export const userServices = {
  createUserDB,
  getAllUsersDB,
  getSingleUsersDB,
  updateUsersDB,
  deleteUsersDB,
  orderDataPutDB,
  GetAllOrdersFromSpecificUsersDB,
  GetTotalPriceOrdersUsersDB,
};

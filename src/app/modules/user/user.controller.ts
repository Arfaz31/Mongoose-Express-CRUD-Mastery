import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidationSchema from './validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodValidation = userValidationSchema.parse(userData);

    const result = await userServices.createUserDB(zodValidation);
    res.status(201).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
//getAllUser
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// getSingleUser
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdInNumber = parseInt(userId);
    const result = await userServices.getSingleUsersDB(userIdInNumber);
    res.status(200).json({
      success: true,
      message: 'Single user fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// putUpdateUser
const putUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIdInNumber = parseInt(userId);
    const userData = req.body;
    const result = await userServices.updateUsersDB(userIdInNumber, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//deleteUser
const deleteUsersDB = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIdInNumber = parseInt(userId);

    await userServices.deleteUsersDB(userIdInNumber);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: 'null',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//order data update
const orderDataUpdate = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIdInNumber = parseInt(userId);
    const userOrderData = req.body;
    await userServices.orderDataPutDB(userIdInNumber, userOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: 'null',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Retrieve all order from a specific user
const getOrderDataFromSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIdInNumber = parseInt(userId);
    const result =
      await userServices.GetAllOrdersFromSpecificUsersDB(userIdInNumber);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//Get total price of orders
const getTotalPriceOfOrdersFromSpecificUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.params.userId;
    const userIdInNumber = parseInt(userId);
    const result =
      await userServices.GetTotalPriceOrdersUsersDB(userIdInNumber);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  putUpdateUser,
  deleteUsersDB,
  orderDataUpdate,
  getOrderDataFromSpecificUser,
  getTotalPriceOfOrdersFromSpecificUser,
};

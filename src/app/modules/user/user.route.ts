import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.putUpdateUser);
router.put('/:userId/orders', userController.orderDataUpdate);
router.get('/:userId/orders', userController.getOrderDataFromSpecificUser);
router.get(
  '/:userId/orders/total-price',
  userController.getTotalPriceOfOrdersFromSpecificUser,
);
router.delete('/:userId', userController.deleteUsersDB);

export const userRoutes = router;

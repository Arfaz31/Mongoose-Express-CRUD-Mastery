import { Schema, model } from 'mongoose';
import {
  tFullNameOfUser,
  tUserAddress,
  tUserOrder,
  tUsers,
} from './user.interface';

const fullNameSchema = new Schema<tFullNameOfUser>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const userAddressSchema = new Schema<tUserAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const userOrderSchema = new Schema<tUserOrder>({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const userSchema = new Schema<tUsers>({
  userId: {
    type: Number,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: fullNameSchema,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: userAddressSchema,
  },
  orders: {
    type: [userOrderSchema],
  },
});

export const userModel = model<tUsers>('user', userSchema);

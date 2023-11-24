import { Schema, model } from 'mongoose';
import {
  tFullNameOfUser,
  tUserAddress,
  tUserOrder,
  tUsers,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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
    unique: true,
  },
  userName: {
    type: String,
    unique: true,
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
    default: undefined,
  },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const userModel = model<tUsers>('user', userSchema);

import { Model } from 'mongoose';

export type tFullNameOfUser = {
  firstName: string;
  lastName: string;
};

export type tUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type tUserOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type tUsers = {
  userId: number;
  username: string;
  password: string;
  fullName: tFullNameOfUser;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: tUserAddress;
  orders?: tUserOrder[];
};

export interface userTypeModel extends Model<tUsers> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<tUsers | null>;
}

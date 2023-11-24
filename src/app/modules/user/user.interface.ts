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
  userName: string;
  password: string;
  fullName: tFullNameOfUser;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: tUserAddress;
  orders?: tUserOrder[];
};

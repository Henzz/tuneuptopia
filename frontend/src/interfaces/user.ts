export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  role?: string;
}

export interface UserCreate extends User {
  password: string;
}
export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export type CommonError = Record<"errors", any>;

export type ICreateUserResponse = {
  username: string;
  email: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

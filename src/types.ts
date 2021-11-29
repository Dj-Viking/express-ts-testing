export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}
export type ICreateUserResponse = {
  username: string;
  email: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUpdateUser {
  username?: string;
  email?: string;
  _id: string;
}
export interface IUpdateUserObject {
  username?: string;
  email?: string;
}
export interface IUpdateUserResponse {
  username: string;
  email: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CommonError = Record<"errors", any>;

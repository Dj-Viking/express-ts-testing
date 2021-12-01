import jwt from "jsonwebtoken";

export type MyJwtData = IJwtData;
export interface IJwtData extends jwt.JwtPayload {
  username: string;
  email: string;
  uuid?: string;
  resetEmail?: string;
  iat?: number;
  exp?: number;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}
export namespace Express {
  export interface Request {
    user: MyJwtData | null;
  }
}
export interface SignLoginRegisterMeTokenArgs {
  username: string;
  email: string;
  uuid?: string;
}
export interface SignResetPasswordTokenArgs {
  resetEmail: string;
  uuid: string;
  exp: string;
}
// export type MyContext = {
//   req: Request & {
//     user: MyJwtData | null;
//   };
//   res: Response;
//   next: NextFunction;
// };

export interface ICreateCardPayload extends Object {
  frontsideText: string;
  frontsideLanguage: string;
  frontsidePicture: string;
  backsideText: string;
  backsideLanguage: string;
  backsidePicture: string;
}
export interface ICreateUserResponse extends Object {
  username: string;
  email: string;
  _id: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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

import jwt from "jsonwebtoken";
import { Request } from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT?: number;
      EXPIRED_TOKEN?: string;
      INVALID_SIGNATURE?: string;
      SECRET?: string;
      EXPIRATION?: string;
    }
  }
}
//declaration merging with express request
export namespace Express {
  export type MyRequest = Request & {
    user?: MyJwtData | null;
  };
}

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

import { signToken } from "../utils/signToken";
import { User } from "../models";
import {
  ICreateUser,
  ICreateUserResponse,
  IUpdateUser,
  IUpdateUserObject,
  IUpdateUserResponse,
} from "../types";
// eslint-disable-next-line
const uuid = require("uuid");

export const UserService = {
  createUser: async function (
    args: ICreateUser
  ): Promise<ICreateUserResponse | void> {
    try {
      const { username, email, password } = args;
      const createdUser = await User.create({
        username,
        role: "user",
        email,
        password,
      });

      const token = signToken({
        _id: createdUser._id,
        role: "user",
        username,
        email,
        uuid: uuid.v4(),
      });

      return {
        user: {
          username: createdUser.username,
          email: createdUser.email,
          _id: createdUser._id,
          token,
          role: createdUser.role,
          createdAt: createdUser.createdAt,
          updatedAt: createdUser.updatedAt,
        },
      };
    } catch (error) {
      if (error.errors) {
        throw error;
      }
    }
  },
  updateUserById: async function (
    args: IUpdateUser
  ): Promise<IUpdateUserResponse> {
    const { _id, username, email } = args;
    const updateObj = {
      username,
      email,
    } as IUpdateUserObject;

    const updatedUser = await User.findByIdAndUpdate(_id, updateObj, {
      new: true,
      runValidators: true,
    });
    return {
      //@ts-expect-error should have a user since we will have necessary items to complete the query
      _id: updatedUser._id,
      //@ts-expect-error should have a user since we will have necessary items to complete the query
      username: updatedUser.username,
      //@ts-expect-error should have a user since we will have necessary items to complete the query
      email: updatedUser.email,
      //@ts-expect-error should have a user since we will have necessary items to complete the query
      createdAt: updatedUser.createdAt,
      //@ts-expect-error should have a user since we will have necessary items to complete the query
      updatedAt: updatedUser.updatedAt,
    } as IUpdateUserResponse;
  },
};

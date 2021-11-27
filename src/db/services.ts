import User from "../models/User";
import { ICreateUser, ICreateUserResponse } from "../types";

export const UserService = {
  createUser: async function (
    args: ICreateUser
  ): Promise<ICreateUserResponse | unknown> {
    try {
      const { username, email, password } = args;
      const createdUser = await User.create({
        username,
        email,
        password,
      });
      return {
        username: createdUser.username,
        email: createdUser.email,
        _id: createdUser._id,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      };
    } catch (error) {
      switch (true) {
        case error.errors.email: {
          throw {
            email: error.errors.email,
          };
        }
        case error.errors.username: {
          throw {
            username: error.errors.username,
          };
        }
        case error.errors.password: {
          throw {
            password: error.errors.password,
          };
        }
        default:
          throw error;
      }
    }
  },
};

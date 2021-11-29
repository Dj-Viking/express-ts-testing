import User from "../models/User";
import {
  ICreateUser,
  ICreateUserResponse,
  IUpdateUser,
  IUpdateUserObject,
  IUpdateUserResponse,
} from "../types";

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
  updateUserById: async function (
    args: IUpdateUser
  ): Promise<IUpdateUserResponse | unknown> {
    const { _id, username, email } = args;
    try {
      const updateObj = {
        username,
        email,
      } as IUpdateUserObject;
      console.log("update obj created", updateObj);
      //delete the properties that are undefined from the object sent
      // by the request body
      switch (true) {
        case !_id:
          throw { id: `must provide an id to update a user` };
        case !username:
          delete updateObj.username;
          break;
        case !email:
          delete updateObj.email;
          break;
        default:
          break;
      }

      console.log("trimmed update object", updateObj);

      const updatedUser = await User.findByIdAndUpdate(_id, updateObj, {
        new: true,
        runValidators: true,
      });
      console.log("updated user db response", updatedUser);
      return {
        _id: updatedUser?._id,
        username: updatedUser?.username,
        email: updatedUser?.email,
        createdAt: updatedUser?.createdAt,
        updatedAt: updatedUser?.updatedAt,
      } as IUpdateUserResponse;
    } catch (error) {
      console.log("error when updating user: ", error, error.id);
      throw error.id || error;
    }
  },
};

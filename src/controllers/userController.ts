import User from "../models/User";
import { Request, Response } from "express";
import { UserService } from "../db/services";
// import { formatCreateUserError } from "../utils/formatError";
// import { MyJwtData } from "types";
const { createUser, updateUserById } = UserService;
export const UserController = {
  createUser: async function (req: Request, res: Response): Promise<Response> {
    console.log("request body of create user route", req.body);
    const { username, email, password } = req.body;
    try {
      // TODO: verify the request body most likely with some verifyUser middleware
      const user = await createUser({
        username,
        email,
        password,
      });
      console.log("created user", user);
      // const { token } = req.user as MyJwtData | null;
      return res.status(201).json({ user });
    } catch (error) {
      // let errorsObj = {} as { username: any; email: any; password: any };
      // if (error.errors) {
      //   errorsObj = {
      //     ...error.errors,
      //   };
      // }
      // if (
      //   Boolean(errorsObj.username || errorsObj.email || errorsObj.password)
      // ) {
      //   return res.status(400).json({
      //     error: `${formatCreateUserError({
      //       username,
      //       email,
      //       password,
      //     })}`,
      //   });
      // }
      console.error("error when creating a user", error);
      return res.status(500).json({
        error: `error when creating a user: ${error}, ${error.stack}`,
      });
    }
  },
  getAllUsers: async function (
    _req: Request,
    res: Response
  ): Promise<Response> {
    console.log("get all users query");
    try {
      const allUsers = await User.find({}).select("-__v");
      return res.status(200).json({ users: allUsers });
    } catch (error) {
      return res.status(500).json({
        error: `error when getting all users ${error}`,
      });
    }
  },
  getUserById: async function (req: Request, res: Response): Promise<Response> {
    try {
      // TODO make middleware to verify if a user exists with that ID
      const foundUser = await User.findOne({ _id: req.params.id }).select(
        "-__v"
      );
      if (foundUser === null) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.status(200).json({ user: foundUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  deleteUserById: async function (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // TODO make middleware to verify if a user exists with that ID
      const foundUser = await User.findOne({ _id: req.params.id }).select(
        "-__v"
      );
      if (foundUser === null) {
        return res.status(404).json({ message: "user not found" });
      }
      const deleteRes = await User.findOneAndDelete({ _id: req.params.id });
      console.log("delete response", deleteRes);
      if (deleteRes !== null)
        return res.status(200).json({ message: "deleted user" });
      else throw new Error("delete response was null, unsuccessful delete");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || error });
    }
  },
  updateUserById: async function (
    req: Request,
    res: Response
  ): Promise<Response> {
    // TODO make middleware to verify if a user exists with that ID
    const foundUser = await User.findOne({ _id: req.params.id });
    if (foundUser === null) {
      return res.status(404).json({ message: "user not found" });
    }
    try {
      console.log(
        "\x1b[33m",
        "request to update a user",
        "\x1b[00m",
        req.body,
        req.params
      );
      const updatedUser = await updateUserById({
        _id: req.params.id,
        username: req.body.username,
        email: req.body.email,
      });
      console.log("updated user service response", { user: updatedUser });
      return res.status(200).json({ user: updatedUser });
    } catch (error) {
      return res.status(500).json({
        error: `error when updating a user by id ${error}`,
      });
    }
  },
};

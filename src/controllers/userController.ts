import User from "../models/User";
import { Request, Response } from "express";

export const UserController = {
  createUser: async function (
    req: Request,
    res: Response
  ): Promise<Record<string, any>> {
    console.log("user create request");
    try {
      // TODO: verify the request body most likely with some verifyUser middleware
      const createdUser = await User.create(req.body);
      return res.status(201).json({ user: createdUser });
    } catch (error) {
      return res.status(500).json({
        error: `error when creating a user ${
          error.message as Error["message"]
        }`,
      });
    }
  },
  getAllUsers: async function (
    _req: Request,
    res: Response
  ): Promise<Record<string, any>> {
    console.log("get all users query");
    try {
      const allUsers = await User.find({}).select("-__v");
      return res.status(200).json({ users: allUsers });
    } catch (error) {
      return res.status(500).json({
        error: `error when getting all users ${
          error.message as Error["message"]
        }`,
      });
    }
  },
};

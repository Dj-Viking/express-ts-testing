import mongoose from "mongoose";
import { User, Card } from "../models";
import { Express } from "../types";
import { Response } from "express";
import { UserService } from "../db/services";
import { formatCreateUserError } from "../utils/formatError";
import { signToken } from "../utils/signToken";
// eslint-disable-next-line
const uuid = require("uuid");
// import { MyJwtData } from "types";
const { createUser, updateUserById } = UserService;
export const UserController = {
  createUser: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    const { username, email, password } = req.body;
    try {
      // TODO: verify the request body most likely with some verifyUser middleware
      const user = await createUser({
        username,
        email,
        password,
      });
      return res.status(201).json({ user: user.user });
    } catch (error) {
      let errorsObj = {} as { username: any; email: any; password: any };
      if (error.errors) {
        errorsObj = {
          ...error.errors,
        };
      }
      if (
        Boolean(errorsObj.username || errorsObj.email || errorsObj.password)
      ) {
        return res
          .status(400)
          .json({ error: `${formatCreateUserError(errorsObj)}` });
      }
      // console.error("error when creating a user", error);
      return res.status(500).json({
        error: `error when creating a user: ${error}, ${error.stack}`,
      });
    }
  },
  login: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    try {
      const { email, password } = req.body;
      if (!password || !email)
        return res.status(422).json({ error: "unprocessable entity" });
      const foundUser = await User.findOne({ email });
      if (foundUser === null)
        return res.status(400).json({ error: "incorrect credentials" });
      // console.log("found user in login route", foundUser);
      const validPass = await foundUser.isCorrectPassword(password);
      if (!validPass)
        return res.status(400).json({ error: "incorrect credentials" });
      const token = signToken({
        _id: foundUser._id as string,
        role: foundUser.role as string,
        username: foundUser.username as string,
        email: foundUser.email as string,
        uuid: uuid.v4(),
      });
      //casting the id strings into the objects themselves
      // @ts-expect-error found user is found if we are here
      const ids = foundUser.cards.map((card) => {
        // @ts-expect-error the cards should be defined during testing otherwise a real situation will yield an empty array if the user didn't have cards
        return new mongoose.Types.ObjectId(card._id);
      });
      //get the users cards
      const userCards = await Card.find({
        _id: { $in: ids },
      }).select("-__v");

      const returnUser = {
        token,
        username: foundUser?.username,
        role: foundUser?.role || "user",
        email: foundUser?.email,
        _id: foundUser?._id,
        cards: userCards,
      };
      return res.status(200).json({ user: returnUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || error });
    }
  },
  getAllUsers: async function (_: any, res: Response): Promise<Response> {
    // console.log("get all users query");
    try {
      const allUsers = await User.find({}).select("-__v").select("-password");
      return res.status(200).json({ users: allUsers });
    } catch (error) {
      return res.status(500).json({
        error: `error when getting all users ${error}`,
      });
    }
  },
  getUserById: async function (
    req: Express.MyRequest,
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
      return res.status(200).json({ user: foundUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  updateUserById: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    // TODO make middleware to verify if a user exists with that ID
    const foundUser = await User.findOne({ _id: req.params.id });
    if (foundUser === null) {
      return res.status(404).json({ message: "user not found" });
    }
    try {
      // console.log(
      //   "\x1b[33m",
      //   "request to update a user",
      //   "\x1b[00m",
      //   req.body,
      //   req.params
      // );
      const updatedUser = await updateUserById({
        _id: req.params.id,
        username: req.body.username,
        email: req.body.email,
      });
      // console.log("updated user service response", { user: updatedUser });
      return res.status(200).json({ user: updatedUser });
    } catch (error) {
      return res.status(500).json({
        error: `error when updating a user by id ${error}`,
      });
    }
  },
};

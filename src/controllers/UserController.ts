import mongoose from "mongoose";
import { User, Card } from "../models";
import { Express, ICreateUserResponse } from "../types";
import { Response } from "express";
import { UserService } from "../db/services";
import { formatCreateUserError } from "../utils/formatError";
import { signToken } from "../utils/signToken";
// eslint-disable-next-line
const uuid = require("uuid");
const { createUser, updateUserById } = UserService;
export const UserController = {
  testAdminUser: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      role: "admin",
    });
    const token = signToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: "admin",
      uuid: uuid.v4(),
    });
    const returnUser = {
      username: user.username,
      email: user.email,
      _id: user._id,
      role: user.role,
      token,
    };
    return res.status(201).json({ user: returnUser });
  },
  testNoRoleUser: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = signToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: void 0,
      uuid: uuid.v4(),
    });
    const returnUser = {
      username: user.username,
      email: user.email,
      _id: user._id,
      role: user.role,
      token,
    };
    return res.status(201).json({ user: returnUser });
  },
  createUser: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    const { username, email, password } = req.body;
    try {
      const user = await createUser({
        username,
        email,
        password,
      });
      return (
        res
          .status(201)
          // @ts-expect-error this will be defined if we didn't throw an error inside createUser
          .json({ user: user.user as ICreateUserResponse["user"] })
      );
    } catch (error) {
      let errorsObj = {} as { username: any; email: any; password: any };
      if (error.errors) {
        errorsObj = {
          ...error.errors,
        };
      }
      return res
        .status(400)
        .json({ error: `${formatCreateUserError(errorsObj)}` });
    }
  },
  login: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
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
      username: foundUser.username,
      role: foundUser.role,
      email: foundUser.email,
      _id: foundUser._id,
      cards: userCards,
    };
    return res.status(200).json({ user: returnUser });
  },
  getAllUsers: async function (_: any, res: Response): Promise<Response> {
    // console.log("get all users query");
    const allUsers = await User.find({}).select("-__v").select("-password");
    return res.status(200).json({ users: allUsers });
  },
  getUserById: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    // TODO make middleware to verify if a user exists with that ID
    const foundUser = await User.findOne({ _id: req.params.id }).select("-__v");
    if (foundUser === null) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ user: foundUser });
  },
  updateUserById: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    const updatedUser = await updateUserById({
      _id: req.params.id,
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
    });
    return res.status(200).json({ user: updatedUser });
  },
};

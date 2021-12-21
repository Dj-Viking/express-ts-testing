import mongoose from "mongoose";
import { Card, User } from "../models";
import { Response } from "express";
import { Express } from "../types";

export const CardController = {
  //TODO update the requestor's card array with whatever card is being created here
  createCard: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    // console.log("do i have req.user as the decoded token", req.user);
    const createdCard = await Card.create({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    });
    const updatedCardWithCreatorId = await Card.findOneAndUpdate(
      { _id: createdCard._id },
      {
        // @ts-expect-error will be checked in middleware if we are here then it exists
        creator: req.user._id,
      },
      { new: true }
    ).select("-__v");

    const foundUser = await User.findOneAndUpdate(
      // @ts-expect-error will be checked in middleware if we are here then it exists
      { _id: req.user._id },
      { $push: { cards: updatedCardWithCreatorId } },
      { new: true }
    );
    // @ts-expect-error we will have a user since the req user is verified
    return res.status(201).json({ cards: foundUser.cards });
  },
  updateCardById: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    const updatedCard = await Card.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { ...req.body },
      { new: true }
    );
    // console.log("updated card mongo response", { card: updatedCard });
    return res.status(200).json({ card: updatedCard });
  },
};

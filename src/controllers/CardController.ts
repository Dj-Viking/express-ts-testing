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
    try {
      // console.log("do i have req.user as the decoded token", req.user);
      const createdCard = await Card.create({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
      });
      const updatedCardWithCreatorId = await Card.findOneAndUpdate(
        { _id: createdCard._id },
        {
          creator: req.user?._id,
        },
        { new: true }
      ).select("-__v");

      const foundUser = await User.findOneAndUpdate(
        { _id: req.user?._id },
        { $push: { cards: updatedCardWithCreatorId } },
        { new: true }
      );
      if (foundUser === null)
        return res.status(401).json({
          error:
            "not authenticated can't add a card to a non user's collection",
        });

      return res.status(201).json({ cards: foundUser.cards });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || error });
    }
  },
  updateCardById: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    try {
      const updatedCard = await Card.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { ...req.body },
        { new: true }
      );
      // console.log("updated card mongo response", { card: updatedCard });
      return res.status(200).json({ card: updatedCard });
    } catch (error) {
      return res.status(500).json({
        error: `error when updating a card by id ${error}`,
      });
    }
  },
};

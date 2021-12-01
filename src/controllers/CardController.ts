import { Card } from "../models";
import { Response } from "express";
import { Express } from "../types";

export const CardController = {
  createCard: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    try {
      console.log("do i have req.user as the decoded token", req.user);
      const createdCard = await Card.create({
        ...req.body,
      });
      console.log("created card here", createdCard);
      console.log("what is req.user here", req.user);
      console.log("what is req.user._id here", req.user?._id);
      //update this card to have a creator id of the req.user.id
      const updatedCardWithCreatorId = await Card.findOneAndUpdate(
        { _id: createdCard._id },
        {
          creator: req.user?._id,
        },
        { new: true }
      ).select("-__v");
      console.log("updated card here", updatedCardWithCreatorId);
      return res.status(201).json({ card: updatedCardWithCreatorId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || error });
    }
  },
  updateCardById: async function (
    req: Express.MyRequest,
    res: Response
  ): Promise<Response> {
    // TODO make params middleware to verify if a user exists with that ID
    const foundCard = await Card.findOne({ _id: req.params.id });
    if (foundCard === null) {
      return res.status(404).json({ message: "card not found" });
    }
    try {
      console.log(
        "\x1b[33m",
        "request to update a card",
        "\x1b[00m",
        req.body,
        req.params
      );
      const updatedCard = await Card.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { ...req.body },
        { new: true }
      );
      console.log("updated card mongo response", { card: updatedCard });
      return res.status(200).json({ card: updatedCard });
    } catch (error) {
      return res.status(500).json({
        error: `error when updating a card by id ${error}`,
      });
    }
  },
};

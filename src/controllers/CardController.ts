import Card from "../models/Card";
import { Request, Response } from "express";

export const CardController = {
  createCard: async function (
    req: Request,
    res: Response
  ): Promise<Record<string, any>> {
    const payload = { ...req.body };
    console.log("what is body payload on create card route", payload);
    try {
      const createdCard = await Card.create(payload);
      return res.status(201).json({ card: createdCard });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || error });
    }
  },
  updateCardById: async function (
    req: Request,
    res: Response
  ): Promise<Record<string, any>> {
    // TODO make middleware to verify if a user exists with that ID
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

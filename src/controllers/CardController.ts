import Card from "../models/Card";
import { Request, Response } from "express";
import { ICreateCardPayload } from "../types";

export const CardController = {
  createCard: async function (
    req: Request,
    res: Response
  ): Promise<Record<string, any>> {
    try {
      const payload = {
        ...req.body,
      } as ICreateCardPayload;
      const createdCard = await Card.create(payload);
      console.log("created card response", createdCard);
      return res.status(201).json({ card: createdCard });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || error });
    }
  },
};

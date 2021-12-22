import { Response, NextFunction } from "express";
import { Card } from "../models";
import { Express } from "../types";

export async function cardNotFound(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { params } = req;
    const cardToUpdate = await Card.findOne({ _id: params.id });
    if (cardToUpdate === null)
      return res.status(404).json({ message: "card not found" });
    return next();
  } catch (error) {}
}

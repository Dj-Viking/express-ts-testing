import { Response, NextFunction } from "express";
import { Card } from "../models";
import { Express } from "../types";

export async function updateOnlyOwnCards(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { params } = req;
    const cardToUpdate = await Card.findOne({ _id: params.id });
    // @ts-expect-error the user and card are verified in previous middlewares
    if (req.user._id !== cardToUpdate.creator)
      return res.status(403).json({ message: "forbidden" });
    return next();
  } catch (error) {}
}

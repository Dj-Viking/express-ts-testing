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
    if (req.user?._id !== cardToUpdate?.creator)
      return res.status(403).json({ message: "forbidden" });
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Oops sorry this request could not be processed, please try again later.",
    });
  }
}

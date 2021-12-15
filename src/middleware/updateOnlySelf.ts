import { Response, NextFunction } from "express";
import { Express } from "../types";

export async function updateOnlyAsSelfOrAdmin(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { params } = req;
    switch (true) {
      case req.user?.role === "admin":
        return next();
      case params.id !== req.user?._id && req.user?.role === "user": {
        return res.status(403).json({ message: "forbidden" });
      }
    }
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Oops sorry this request could not be processed, please try again later.",
    });
  }
}

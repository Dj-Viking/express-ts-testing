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
      // @ts-expect-error verified in previous middleware
      case req.user.role === "admin":
        return next();
      // @ts-expect-error verified in previous middleware
      case params.id !== req.user._id && req.user.role === "user": {
        return res.status(403).json({ message: "forbidden" });
      }
    }
    return next();
  } catch (error) {}
}

import { Response, NextFunction } from "express";
import { Express } from "../types";

export async function isUserRole(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    if (!req.user) return res.status(401).json({ message: "unauthorized" });
    if (req.user.role !== "user")
      return res.status(403).json({
        message:
          "forbidden, please contact your administrator to set your role permissions properly",
      });
    return next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong, please try again later." });
  }
}

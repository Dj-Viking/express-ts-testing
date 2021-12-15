import { Response, NextFunction } from "express";
import { Express } from "../types";

export async function updateRoleOnlyAsAdmin(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { body } = req;
    if (!req.user) return res.status(401).json({ message: "unauthorized" });
    if (!!body.role && body.role !== "user" && req.user?.role !== "admin")
      return res.status(403).json({ message: "forbidden" });
    return next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong, please try again later." });
  }
}

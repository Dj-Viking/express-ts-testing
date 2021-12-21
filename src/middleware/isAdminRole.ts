import { Response, NextFunction } from "express";
import { Express } from "../types";

export async function isAdminRole(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    if (!req.user) return res.status(401).json({ message: "unauthorized" });
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "forbidden" });
    return next();
  } catch (error) {}
}

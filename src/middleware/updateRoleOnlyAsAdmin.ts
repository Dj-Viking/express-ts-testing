import { Response, NextFunction } from "express";
import { Express } from "../types";

export async function updateRoleOnlyAsAdmin(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { body } = req;
    // @ts-expect-error req user is verified in previous middleware
    if (!!body.role && body.role !== "user" && req.user.role !== "admin")
      return res.status(403).json({ message: "forbidden" });
    return next();
  } catch (error) {}
}

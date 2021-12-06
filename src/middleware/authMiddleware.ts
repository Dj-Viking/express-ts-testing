import { verifyTokenAsync } from "../utils/verifyTokenAsync";
import { Response, NextFunction } from "express";
import { Express } from "../types";

export async function authMiddleware(
  req: Express.MyRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const token = req?.headers?.authorization?.split(" ")[1] || null;
  if (!token) return res.status(401).json({ error: "not authenticated" });
  //verify token
  verifyTokenAsync(token)
    .then((decoded) => {
      if (decoded instanceof Error)
        return res.status(403).json({ error: decoded });
      else {
        req.user = decoded;
        return next();
      }
    })
    .catch((error) => {
      console.error("error when verifying token in middleware", error);
      return res.status(500).json({ error: error.message || error });
    });
}

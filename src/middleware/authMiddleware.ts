import { verifyTokenAsync } from "../utils/verifyTokenAsync";
import { Request, Response, NextFunction } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const token = req?.headers?.authorization?.split(" ")[1] || null;
  console.log("what is token in middle ware", token);
  if (!token) return res.status(401).json({ error: "not authenticated" });
  //verify token
  verifyTokenAsync(token)
    .then((decoded) => {
      if (decoded instanceof Error)
        return res.status(403).json({ error: decoded });
      else return next();
    })
    .catch((error) => {
      return res.status(500).json({ error: error.stack });
    });
}

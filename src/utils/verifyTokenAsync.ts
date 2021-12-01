import jwt from "jsonwebtoken";
import { MyJwtData } from "../types";

const { EXPIRATION, SECRET } = process.env;

export async function verifyAsync(
  token: string
): Promise<MyJwtData | null | Error> {
  return new Promise((resolve) => {
    let returnMe: MyJwtData | null | any;
    jwt.verify(
      token as string,
      SECRET as string,
      { maxAge: EXPIRATION }, //maxage deprecated but still accepted...
      (error, decoded) => {
        if (error?.message.includes("malformed")) returnMe = error;
        if (error?.message.includes("expired")) returnMe = error;
        if (error?.message.includes("invalid")) returnMe = error;
        if (decoded) returnMe = decoded;
      }
    );
    resolve(returnMe);
  });
}

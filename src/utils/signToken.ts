import jwt from "jsonwebtoken";
import {
  SignLoginRegisterMeTokenArgs,
  SignResetPasswordTokenArgs,
} from "../types";

const { SECRET, EXPIRATION } = process.env;

export function signToken(
  args: SignLoginRegisterMeTokenArgs | SignResetPasswordTokenArgs
): string {
  const {
    username,
    _id,
    role,
    uuid: someUuid, //i think im aliasing here
    email,
  } = args as SignLoginRegisterMeTokenArgs;

  const { resetEmail, uuid, exp } = args as SignResetPasswordTokenArgs;

  switch (true) {
    case Boolean(username && someUuid && email && _id && role): {
      return jwt.sign(
        {
          username,
          _id,
          role,
          uuid: someUuid,
          email,
        },
        SECRET as string,
        { expiresIn: EXPIRATION as string }
      );
    }
    case Boolean(uuid && exp && resetEmail): {
      return jwt.sign(
        {
          resetEmail,
          uuid,
        },
        SECRET as string,
        { expiresIn: exp }
      );
    }
    default:
      return `couldn't create a token from the input args in signToken, one of the properties in the args input object was possibly null or undefined`;
  }
}

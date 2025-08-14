import jwt from "jsonwebtoken";
import {
  JwtTokenExpiredException,
  JwtTokenInvalidException,
} from "../../auth/exceptions";

export const validateJWT = (token: string): jwt.JwtPayload => {
  try {
    const decoded = jwt.verify(token, "secret");

    return decoded as jwt.JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw new JwtTokenExpiredException({
        context: { token },
      });

    throw new JwtTokenInvalidException({
      context: { token },
    });
  }
};

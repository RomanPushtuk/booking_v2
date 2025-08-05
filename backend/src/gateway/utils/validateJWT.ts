import jwt from "jsonwebtoken";
import {
  TokenExpiredException,
  UnauthorizedException,
} from "../../auth/exceptions/exceptions";

export const validateJWT = (token: string): jwt.JwtPayload => {
  try {
    const decoded = jwt.verify(token, "secret");

    return decoded as jwt.JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw new TokenExpiredException({ cause: error });

    throw new UnauthorizedException({ cause: error });
  }
};

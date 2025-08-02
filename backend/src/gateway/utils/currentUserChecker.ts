import { Action } from "routing-controllers";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { auth } from "../imports";
import {
  TokenExpiredException,
  UnauthorizedException,
} from "../../auth/exceptions/exceptions";

export const currentUserChecker = async (action: Action) => {
  const token = action.request.headers["authorization"];
  const decoded = jwt.verify(
    token,
    "secret",
    (error: VerifyErrors | null, decoded: unknown) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError) {
          throw new TokenExpiredException({ cause: error });
        }

        throw new UnauthorizedException({ cause: error });
      }

      return decoded;
    },
  ) as unknown as jwt.JwtPayload;
  return await auth.services.authService.getUserById(decoded["id"]);
};

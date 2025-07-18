import { Action } from "routing-controllers";
import jwt from "jsonwebtoken";
import { auth } from "../imports";

export const currentUserChecker = async (action: Action) => {
  const token = action.request.headers["authorization"];
  const decoded = jwt.verify(token, "secret") as jwt.JwtPayload;
  return await auth.services.authService.getUserById(decoded["id"]);
};

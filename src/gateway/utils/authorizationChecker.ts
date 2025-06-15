import { Action } from "routing-controllers";
import jwt from "jsonwebtoken";
import { auth, shared } from "../imports";

export const authorizationChecker = async (
  action: Action,
  roles: shared.enums.Roles[],
) => {
  const token = action.request.headers["authorization"];
  const decoded = jwt.verify(token, "secret") as jwt.JwtPayload;
  const user = await auth.services.authService.getUserById(decoded["id"]);
  if (!roles.length) return true;
  if (roles.find((role) => role === user.role)) return true;
  return false;
};

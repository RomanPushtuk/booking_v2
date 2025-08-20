import { Action } from "routing-controllers";
import { auth } from "../imports";

import { validateJWT } from "./validateJWT";

export const currentUserChecker = async (action: Action) => {
  const token = action.request.headers["authorization"];
  const decoded = validateJWT(token);
  return await auth.services.authService.getUserById(decoded["id"]);
};

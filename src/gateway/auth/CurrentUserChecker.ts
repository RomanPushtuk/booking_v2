import { Action } from "routing-controllers";
import jwt from "jsonwebtoken";
import { UserToken } from "./AuthChecker";
import { shared } from "../imports";

/**
 * Extracts current user data from the token
 * @param action Request context
 * @returns User information or undefined
 */
export const currentUserChecker = async (action: Action): Promise<UserToken | undefined> => {
  const logger = shared.logger.child({ function: "currentUserChecker" });
  
  try {
    const authHeader = action.request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return undefined;
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
      return undefined;
    }
    
		const secret = process.env["JWT_SECRET"] || "your_jwt_secret";
    const decodedToken = jwt.verify(token, secret) as UserToken;
    
    return decodedToken;
  } catch (error) {
    logger.error(error, "Error extracting user from token");
    return undefined;
  }
};

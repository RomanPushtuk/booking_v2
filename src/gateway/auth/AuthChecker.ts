import { Action } from "routing-controllers";
import jwt from "jsonwebtoken";
import { shared } from "../imports";
export interface UserToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
/**
 * Checks if the user has access to the endpoint
 * @param action Request context
 * @param roles List of roles allowed to access
 * @returns Authorization check result
 */
export const authorizationChecker = async (
  action: Action,
  roles: string[]
): Promise<boolean> => {
  const logger = shared.logger.child({ function: "authorizationChecker" });
  
  try {
    const authHeader = action.request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.info("No bearer token provided");
      return false;
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
      logger.info("Invalid token format");
      return false;
    }
    
    // Verify token
		const secret = process.env["JWT_SECRET"] || "your_jwt_secret";
    const decodedToken = jwt.verify(token, secret) as UserToken;
    
    // Checking an expiration
    const now = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < now) {
      logger.info("Token expired");
      return false;
    }
    
    // If no roles specified, valid token is sufficient
    if (!roles || roles.length === 0) {
      return true;
    }
    
    // Checking user role
    const userRole = decodedToken.role;
    const hasRole = roles.some(role => role === userRole);
    
    logger.info({ 
      userId: decodedToken.userId,
      role: userRole,
      requiredRoles: roles,
      hasAccess: hasRole
    }, "Authorization check completed");
    
    return hasRole;
  } catch (error) {
    logger.error(error, "Error during authorization check");
    return false;
  }
};

import { Action } from "routing-controllers";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { auth, shared } from "../imports";
import {
  ForbiddenException,
  TokenExpiredException,
  UnauthorizedException,
} from "../../auth/exceptions/exceptions";

const permissionsByRole = {
  [shared.enums.Roles.CLIENT]: [
    shared.enums.Permissions.CLIENT_READ_PROFILE,
    shared.enums.Permissions.CLIENT_UPDATE_PROFILE,
    shared.enums.Permissions.CLIENT_DELETE_PROFILE,
    shared.enums.Permissions.CLIENT_READ_BOOKINGS,
    shared.enums.Permissions.CLIENT_CREATE_BOOKING,
    shared.enums.Permissions.CLIENT_UPDATE_BOOKING,
    shared.enums.Permissions.CLIENT_CANCEL_BOOKING,
  ],
  [shared.enums.Roles.HOST]: [
    shared.enums.Permissions.HOST_READ_PROFILE,
    shared.enums.Permissions.HOST_UPDATE_PROFILE,
    shared.enums.Permissions.HOST_DELETE_PROFILE,
    shared.enums.Permissions.HOST_READ_BOOKINGS,
    shared.enums.Permissions.HOST_CREATE_BOOKING,
    shared.enums.Permissions.HOST_UPDATE_BOOKING,
    shared.enums.Permissions.HOST_CANCEL_BOOKING,
  ],
  [shared.enums.Roles.ADMIN]: [
    shared.enums.Permissions.ADMIN_READ_CLIENT,
    shared.enums.Permissions.ADMIN_CREATE_CLIENT,
    shared.enums.Permissions.ADMIN_UPDATE_CLIENT,
    shared.enums.Permissions.ADMIN_DELETE_CLIENT,
    shared.enums.Permissions.ADMIN_READ_HOST,
    shared.enums.Permissions.ADMIN_CREATE_HOST,
    shared.enums.Permissions.ADMIN_UPDATE_HOST,
    shared.enums.Permissions.ADMIN_DELETE_HOST,
    shared.enums.Permissions.ADMIN_READ_BOOKING,
    shared.enums.Permissions.ADMIN_CREATE_BOOKING,
    shared.enums.Permissions.ADMIN_UPDATE_BOOKING,
    shared.enums.Permissions.ADMIN_DELETE_BOOKING,
  ],
} as const;

export const authorizationChecker = async (
  action: Action,
  permissions: shared.enums.Permissions[],
) => {
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

  const user = await auth.services.authService.getUserById(decoded["id"]);

  const userPermissions = permissionsByRole[user.role];

  for (const permission of userPermissions) {
    if (permissions.includes(permission)) return true;
  }

  throw new ForbiddenException();
};

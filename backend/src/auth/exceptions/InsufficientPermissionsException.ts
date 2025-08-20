import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class InsufficientPermissionsException extends BaseException {
  static readonly CODE = "INSUFFICIENT_PERMISSIONS";
  static readonly GROUP = ExceptionGroup.FORBIDDEN;
  static readonly DEFAULT_MESSAGE =
    "Insufficient permissions to access this resource";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: InsufficientPermissionsException.CODE,
      group: InsufficientPermissionsException.GROUP,
      message: message || InsufficientPermissionsException.DEFAULT_MESSAGE,
    });
  }
}

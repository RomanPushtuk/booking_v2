import { error } from "../imports";

export class InsufficientPermissionsException extends error.classes
  .BaseException {
  static readonly CODE = "INSUFFICIENT_PERMISSIONS";
  static readonly GROUP = error.enums.ExceptionGroup.FORBIDDEN;
  static readonly DEFAULT_MESSAGE =
    "Insufficient permissions to access this resource";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: InsufficientPermissionsException.CODE,
      group: InsufficientPermissionsException.GROUP,
      message: message || InsufficientPermissionsException.DEFAULT_MESSAGE,
    });
  }
}

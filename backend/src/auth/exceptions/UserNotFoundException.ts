import { error } from "../imports";

export class UserNotFoundException extends error.classes.BaseException {
  static readonly CODE = "USER_NOT_FOUND";
  static readonly GROUP = error.enums.ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "User not found";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: UserNotFoundException.CODE,
      group: UserNotFoundException.GROUP,
      message: message || UserNotFoundException.DEFAULT_MESSAGE,
    });
  }
}

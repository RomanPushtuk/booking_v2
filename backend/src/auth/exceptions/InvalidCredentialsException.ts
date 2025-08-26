import { error } from "../imports";

export class InvalidCredentialsException extends error.classes.BaseException {
  static readonly CODE = "INVALID_CREDENTIALS";
  static readonly GROUP = error.enums.ExceptionGroup.UNAUTHORIZED;
  static readonly DEFAULT_MESSAGE = "Invalid login or password";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidCredentialsException.CODE,
      group: InvalidCredentialsException.GROUP,
      message: message || InvalidCredentialsException.DEFAULT_MESSAGE,
    });
  }
}

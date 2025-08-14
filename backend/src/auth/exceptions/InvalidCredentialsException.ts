import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class InvalidCredentialsException extends BaseException {
  static readonly CODE = "INVALID_CREDENTIALS";
  static readonly GROUP = ExceptionGroup.UNAUTHORIZED;
  static readonly DEFAULT_MESSAGE = "Invalid login credentials";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidCredentialsException.CODE,
      group: InvalidCredentialsException.GROUP,
      message: message || InvalidCredentialsException.DEFAULT_MESSAGE,
    });
  }
}

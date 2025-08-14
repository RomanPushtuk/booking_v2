import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class JwtTokenInvalidException extends BaseException {
  static readonly CODE = "JWT_TOKEN_INVALID";
  static readonly GROUP = ExceptionGroup.UNAUTHORIZED;
  static readonly DEFAULT_MESSAGE = "JWT token is invalid";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: JwtTokenInvalidException.CODE,
      group: JwtTokenInvalidException.GROUP,
      message: message || JwtTokenInvalidException.DEFAULT_MESSAGE,
    });
  }
}

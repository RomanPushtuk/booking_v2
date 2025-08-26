import { error } from "../imports";

export class JwtTokenInvalidException extends error.classes.BaseException {
  static readonly CODE = "JWT_TOKEN_INVALID";
  static readonly GROUP = error.enums.ExceptionGroup.UNAUTHORIZED;
  static readonly DEFAULT_MESSAGE = "JWT token is invalid";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: JwtTokenInvalidException.CODE,
      group: JwtTokenInvalidException.GROUP,
      message: message || JwtTokenInvalidException.DEFAULT_MESSAGE,
    });
  }
}

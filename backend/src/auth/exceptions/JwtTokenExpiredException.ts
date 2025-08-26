import { error } from "../imports";

export class JwtTokenExpiredException extends error.classes.BaseException {
  static readonly CODE = "JWT_TOKEN_EXPIRED";
  static readonly GROUP = error.enums.ExceptionGroup.UNAUTHORIZED;
  static readonly DEFAULT_MESSAGE = "JWT token has expired";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: JwtTokenExpiredException.CODE,
      group: JwtTokenExpiredException.GROUP,
      message: message || JwtTokenExpiredException.DEFAULT_MESSAGE,
    });
  }
}

import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class JwtTokenExpiredException extends BaseException {
  static readonly CODE = "JWT_TOKEN_EXPIRED";
  static readonly GROUP = ExceptionGroup.UNAUTHORIZED;
  static readonly DEFAULT_MESSAGE = "JWT token has expired";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: JwtTokenExpiredException.CODE,
      group: JwtTokenExpiredException.GROUP,
      message: message || JwtTokenExpiredException.DEFAULT_MESSAGE,
    });
  }
}

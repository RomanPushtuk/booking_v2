import { BaseException } from "../../shared/errors";
import {
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class UnauthorizedException extends BaseException {
  static readonly DEFAULT_MESSAGE = "You are not authorized";
  static readonly CODE = "UNAUTHORIZED";
  static readonly GROUP = ExceptionGroup.UNAUTHORIZED;

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: UnauthorizedException.CODE,
      group: UnauthorizedException.GROUP,
      message: message || UnauthorizedException.DEFAULT_MESSAGE,
    });
  }
}

export class ForbiddenException extends BaseException {
  static readonly DEFAULT_MESSAGE =
    "You are not allowed to perform this action";
  static readonly CODE = "FORBIDDEN";
  static readonly GROUP = ExceptionGroup.FORBIDDEN;

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: ForbiddenException.CODE,
      group: ForbiddenException.GROUP,
      message: message || ForbiddenException.DEFAULT_MESSAGE,
    });
  }
}

export class TokenExpiredException extends BaseException {
  static readonly DEFAULT_MESSAGE = "Token is expired";
  static readonly CODE = "TOKEN_EXPIRED";
  static readonly GROUP = ExceptionGroup.UNAUTHORIZED;

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: TokenExpiredException.CODE,
      group: TokenExpiredException.GROUP,
      message: message || TokenExpiredException.DEFAULT_MESSAGE,
    });
  }
}

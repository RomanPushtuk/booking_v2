import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class InternalServerException extends BaseException {
  static readonly DEFAULT_MESSAGE = "Internal server error";
  static readonly CODE = "INTERNAL_SERVER_ERROR";
  static readonly GROUP = ExceptionGroup.SERVER_ERROR;

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: InternalServerException.CODE,
      group: InternalServerException.GROUP,
      message: message || InternalServerException.DEFAULT_MESSAGE,
    });
  }
}

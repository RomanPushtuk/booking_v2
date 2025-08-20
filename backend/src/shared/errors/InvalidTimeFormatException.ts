import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "./BaseException";

export class InvalidTimeFormatException extends BaseException {
  static readonly CODE = "INVALID_TIME_FORMAT";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Invalid time format provided";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidTimeFormatException.CODE,
      group: InvalidTimeFormatException.GROUP,
      message: message || InvalidTimeFormatException.DEFAULT_MESSAGE,
    });
  }
}

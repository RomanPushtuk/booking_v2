import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "./BaseException";

export class InvalidDurationFormatException extends BaseException {
  static readonly CODE = "INVALID_DURATION_FORMAT";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Invalid duration format provided";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidDurationFormatException.CODE,
      group: InvalidDurationFormatException.GROUP,
      message: message || InvalidDurationFormatException.DEFAULT_MESSAGE,
    });
  }
}

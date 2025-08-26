import { error } from "../imports";

export class InvalidTimeFormatException extends error.classes.BaseException {
  static readonly CODE = "INVALID_TIME_FORMAT";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Invalid time format provided";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidTimeFormatException.CODE,
      group: InvalidTimeFormatException.GROUP,
      message: message || InvalidTimeFormatException.DEFAULT_MESSAGE,
    });
  }
}

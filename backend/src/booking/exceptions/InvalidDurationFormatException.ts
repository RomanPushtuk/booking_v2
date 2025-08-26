import { error } from "../imports";

export class InvalidDurationFormatException extends error.classes
  .BaseException {
  static readonly CODE = "INVALID_DURATION_FORMAT";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Invalid duration format provided";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidDurationFormatException.CODE,
      group: InvalidDurationFormatException.GROUP,
      message: message || InvalidDurationFormatException.DEFAULT_MESSAGE,
    });
  }
}

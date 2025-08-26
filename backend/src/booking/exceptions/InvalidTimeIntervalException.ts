import { error } from "../imports";

export class InvalidTimeIntervalException extends error.classes.BaseException {
  static readonly CODE = "INVALID_TIME_INTERVAL";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Invalid time interval provided";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidTimeIntervalException.CODE,
      group: InvalidTimeIntervalException.GROUP,
      message: message || InvalidTimeIntervalException.DEFAULT_MESSAGE,
    });
  }
}

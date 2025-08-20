import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "./BaseException";

export class InvalidTimeIntervalException extends BaseException {
  static readonly CODE = "INVALID_TIME_INTERVAL";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Invalid time interval provided";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: InvalidTimeIntervalException.CODE,
      group: InvalidTimeIntervalException.GROUP,
      message: message || InvalidTimeIntervalException.DEFAULT_MESSAGE,
    });
  }
}

import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "./BaseException";

export class OverlappingTimeIntervalsException extends BaseException {
  static readonly CODE = "OVERLAPPING_TIME_INTERVALS";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Overlapping time intervals detected";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: OverlappingTimeIntervalsException.CODE,
      group: OverlappingTimeIntervalsException.GROUP,
      message: message || OverlappingTimeIntervalsException.DEFAULT_MESSAGE,
    });
  }
}

import { error } from "../imports";

export class OverlappingTimeIntervalsException extends error.classes
  .BaseException {
  static readonly CODE = "OVERLAPPING_TIME_INTERVALS";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Overlapping time intervals detected";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: OverlappingTimeIntervalsException.CODE,
      group: OverlappingTimeIntervalsException.GROUP,
      message: message || OverlappingTimeIntervalsException.DEFAULT_MESSAGE,
    });
  }
}

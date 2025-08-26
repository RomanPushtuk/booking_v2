import { error } from "../imports";

export class ForwardBookingLimitExceededException extends error.classes
  .BaseException {
  static readonly CODE = "FORWARD_BOOKING_LIMIT_EXCEEDED";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Forward booking limit exceeded";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: ForwardBookingLimitExceededException.CODE,
      group: ForwardBookingLimitExceededException.GROUP,
      message: message || ForwardBookingLimitExceededException.DEFAULT_MESSAGE,
    });
  }
}

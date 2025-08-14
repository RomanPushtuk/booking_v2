import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class ForwardBookingLimitExceededException extends BaseException {
  static readonly CODE = "FORWARD_BOOKING_LIMIT_EXCEEDED";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Forward booking limit exceeded";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: ForwardBookingLimitExceededException.CODE,
      group: ForwardBookingLimitExceededException.GROUP,
      message: message || ForwardBookingLimitExceededException.DEFAULT_MESSAGE,
    });
  }
}

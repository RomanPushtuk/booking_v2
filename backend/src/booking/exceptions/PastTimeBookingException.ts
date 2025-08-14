import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class PastTimeBookingException extends BaseException {
  static readonly CODE = "PAST_TIME_BOOKING";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Cannot create booking in the past";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: PastTimeBookingException.CODE,
      group: PastTimeBookingException.GROUP,
      message: message || PastTimeBookingException.DEFAULT_MESSAGE,
    });
  }
}

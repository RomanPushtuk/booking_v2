import { error } from "../imports";

export class PastTimeBookingException extends error.classes.BaseException {
  static readonly CODE = "PAST_TIME_BOOKING";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Cannot create booking in the past";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: PastTimeBookingException.CODE,
      group: PastTimeBookingException.GROUP,
      message: message || PastTimeBookingException.DEFAULT_MESSAGE,
    });
  }
}

import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class BookingNotFoundException extends BaseException {
  static readonly CODE = "BOOKING_NOT_FOUND";
  static readonly GROUP = ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Booking not found";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: BookingNotFoundException.CODE,
      group: BookingNotFoundException.GROUP,
      message: message || BookingNotFoundException.DEFAULT_MESSAGE,
    });
  }
}

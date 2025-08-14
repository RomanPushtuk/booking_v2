import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class OverlappingBookingsException extends BaseException {
  static readonly CODE = "OVERLAPPING_BOOKINGS";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Booking overlaps with existing bookings";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: OverlappingBookingsException.CODE,
      group: OverlappingBookingsException.GROUP,
      message: message || OverlappingBookingsException.DEFAULT_MESSAGE,
    });
  }
}

import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class NoBookingsFoundException extends BaseException {
  static readonly CODE = "NO_BOOKINGS_FOUND";
  static readonly GROUP = ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "No bookings found matching the criteria";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: NoBookingsFoundException.CODE,
      group: NoBookingsFoundException.GROUP,
      message: message || NoBookingsFoundException.DEFAULT_MESSAGE,
    });
  }
}

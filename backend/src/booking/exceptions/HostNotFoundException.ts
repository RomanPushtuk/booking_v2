import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class HostNotFoundException extends BaseException {
  static readonly CODE = "HOST_NOT_FOUND";
  static readonly GROUP = ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Host not found";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: HostNotFoundException.CODE,
      group: HostNotFoundException.GROUP,
      message: message || HostNotFoundException.DEFAULT_MESSAGE,
    });
  }
}

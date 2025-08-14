import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class HostNotWorkingException extends BaseException {
  static readonly CODE = "HOST_NOT_WORKING";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE =
    "Host is not working during the requested time";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: HostNotWorkingException.CODE,
      group: HostNotWorkingException.GROUP,
      message: message || HostNotWorkingException.DEFAULT_MESSAGE,
    });
  }
}

import { error } from "../imports";

export class HostNotWorkingException extends error.classes.BaseException {
  static readonly CODE = "HOST_NOT_WORKING";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE =
    "Host is not working during the requested time";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: HostNotWorkingException.CODE,
      group: HostNotWorkingException.GROUP,
      message: message || HostNotWorkingException.DEFAULT_MESSAGE,
    });
  }
}

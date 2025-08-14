import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class HostReferenceNotFoundException extends BaseException {
  static readonly DEFAULT_MESSAGE = "Referenced host does not exist";
  static readonly CODE = "INVALID_REFERENCE";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: HostReferenceNotFoundException.CODE,
      group: HostReferenceNotFoundException.GROUP,
      message: message || HostReferenceNotFoundException.DEFAULT_MESSAGE,
    });
  }
}

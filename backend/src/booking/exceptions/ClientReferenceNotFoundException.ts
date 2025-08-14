import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class ClientReferenceNotFoundException extends BaseException {
  static readonly DEFAULT_MESSAGE = "Referenced client does not exist";
  static readonly CODE = "INVALID_REFERENCE";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: ClientReferenceNotFoundException.CODE,
      group: ClientReferenceNotFoundException.GROUP,
      message: message || ClientReferenceNotFoundException.DEFAULT_MESSAGE,
    });
  }
}

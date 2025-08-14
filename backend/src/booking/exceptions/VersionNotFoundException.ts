import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class VersionNotFoundException extends BaseException {
  static readonly CODE = "VERSION_NOT_FOUND";
  static readonly GROUP = ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Version not found";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: VersionNotFoundException.CODE,
      group: VersionNotFoundException.GROUP,
      message: message || VersionNotFoundException.DEFAULT_MESSAGE,
    });
  }
}

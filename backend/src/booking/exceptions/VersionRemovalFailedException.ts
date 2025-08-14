import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class VersionRemovalFailedException extends BaseException {
  static readonly CODE = "VERSION_REMOVAL_FAILED";
  static readonly GROUP = ExceptionGroup.SERVER_ERROR;
  static readonly DEFAULT_MESSAGE = "Failed to remove version";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: VersionRemovalFailedException.CODE,
      group: VersionRemovalFailedException.GROUP,
      message: message || VersionRemovalFailedException.DEFAULT_MESSAGE,
    });
  }
}

import { BaseError } from "../classes";
import { IBaseConstructorError } from "../types";

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor(params: IBaseConstructorError) {
    super(params);
  }
}

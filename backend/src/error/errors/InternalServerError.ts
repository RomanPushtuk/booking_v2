import { BaseError } from "../classes";
import { IBaseConstructorError } from "../types";

export class InternalServerError extends BaseError {
  statusCode = 500;

  constructor(params: IBaseConstructorError) {
    super(params);
  }
}

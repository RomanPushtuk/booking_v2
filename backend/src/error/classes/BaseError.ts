import { IBaseConstructorError } from "../types";

export class BaseError {
  message: string;
  code: string;
  traceId: string | undefined;
  details: Record<string, any>;

  constructor({ message, code, traceId, details }: IBaseConstructorError) {
    this.message = message;
    this.code = code;
    this.traceId = traceId;
    this.details = details;
  }
}

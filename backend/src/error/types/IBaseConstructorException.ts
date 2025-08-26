import { ExceptionGroup } from "../enums";

export interface IBaseConstructorException {
  code: string;
  message?: string;
  group: ExceptionGroup;
  context?: unknown;
  cause?: unknown;
}

export interface IBaseConstructorError {
  message: string;
  code: string;
  traceId: string | undefined;
  details: Record<string, any>;
}

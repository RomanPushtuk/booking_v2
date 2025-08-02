export enum ExceptionGroup {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
}

interface IBaseConstructorException {
  code: string;
  message?: string;
  group: ExceptionGroup;
  context?: unknown;
  cause?: unknown;
}

export interface IConstructorException {
  message?: string;
  context?: unknown;
  cause?: unknown;
}

type ParsedStack = {
  functionName?: string;
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  path?: string;
};

export class BaseException extends Error {
  public readonly code: string;
  public readonly group: ExceptionGroup;
  public readonly context?: unknown;

  public readonly functionName?: string;
  public readonly fileName?: string;
  public readonly lineNumber?: number;
  public readonly columnNumber?: number;
  public readonly path?: string;

  public readonly parsedStack: ParsedStack[] = [];

  constructor({
    message,
    code,
    context,
    cause,
    group,
  }: IBaseConstructorException) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.context = context;
    this.cause = cause;
    this.group = group;

    this.parsedStack = this._captureStack();

    this.functionName = this.parsedStack[0]?.functionName;
    this.fileName = this.parsedStack[0]?.fileName;
    this.lineNumber = this.parsedStack[0]?.lineNumber;
    this.columnNumber = this.parsedStack[0]?.columnNumber;
    this.path = this.parsedStack[0]?.path;
  }

  private _captureStack(): ParsedStack[] {
    const originalPrepare = Error.prepareStackTrace;

    Error.prepareStackTrace = (_err, structuredStack) => structuredStack;

    const callSites = this.stack as unknown as NodeJS.CallSite[];

    Error.prepareStackTrace = originalPrepare;

    const dummyError = new Error();
    dummyError.name = this.constructor.name;

    Error.captureStackTrace(dummyError, this.constructor);

    this.stack = dummyError.stack;

    const cwd = process.cwd();

    return callSites.map((callSite) => {
      const file = callSite.getFileName();
      const fileName = file?.startsWith(cwd)
        ? file.slice(cwd.length + 1)
        : (file ?? undefined);
      const lineNumber = callSite.getLineNumber() || 0;
      const columnNumber = callSite.getColumnNumber() || 0;
      const path = `${fileName}:${callSite.getLineNumber()}:${callSite.getColumnNumber()}`;

      return {
        path,
        fileName,
        lineNumber,
        columnNumber,
        functionName: callSite.getFunctionName() ?? undefined,
      };
    });
  }
}

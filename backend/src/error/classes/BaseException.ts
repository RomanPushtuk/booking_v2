import { ExceptionGroup } from "../enums";
import { IBaseConstructorException, ParsedStack } from "../types";

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
    super(message, { cause });
    this.name = this.constructor.name;
    this.code = code;
    this.context = context;
    this.cause = cause;
    this.group = group;

    this.parsedStack = this._captureStack();

    const [reasonLocation] = this.parsedStack as [ParsedStack];

    this.functionName = reasonLocation.functionName;
    this.fileName = reasonLocation.fileName;
    this.lineNumber = reasonLocation.lineNumber;
    this.columnNumber = reasonLocation.columnNumber;
    this.path = reasonLocation.path;
  }

  private _captureStack(): ParsedStack[] {
    const originalPrepare = Error.prepareStackTrace;

    const cwd = process.cwd();

    Error.prepareStackTrace = (_err, structuredStack) => {
      const callSites = structuredStack as NodeJS.CallSite[];
      const parsedStack = [];

      for (const callSite of callSites) {
        if (!this.isRelevantStack(callSite)) continue;

        const file = callSite.getFileName() as string;
        const fileName = file.startsWith(cwd)
          ? file.slice(cwd.length + 1)
          : file;
        const lineNumber = callSite.getLineNumber() as number;
        const columnNumber = callSite.getColumnNumber() as number;
        const path = `${fileName}:${callSite.getLineNumber()}:${callSite.getColumnNumber()}`;
        const functionName = callSite.getFunctionName() as string;

        parsedStack.push({
          path,
          fileName,
          lineNumber,
          columnNumber,
          functionName,
        });
      }

      return parsedStack;
    };

    const parsedStack = this.stack as unknown as ParsedStack[];

    Error.prepareStackTrace = originalPrepare;

    const dummyError = new Error();
    dummyError.name = this.constructor.name;

    Error.captureStackTrace(dummyError, this.constructor);

    this.stack = dummyError.stack;

    return parsedStack;
  }

  private isRelevantStack(callSite: NodeJS.CallSite): boolean {
    const fileName = callSite.getFileName();
    return Boolean(
      fileName &&
        !fileName.includes("node_modules") &&
        !fileName.startsWith("node:") &&
        !callSite.isNative(),
    );
  }
}

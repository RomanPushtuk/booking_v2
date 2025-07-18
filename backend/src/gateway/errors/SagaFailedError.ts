export class SagaFailedError extends Error {
  original: Error;

  constructor(sagaName: string, original: Error) {
    super(`Error to execute ${sagaName}`);
    this.original = original;
  }
}

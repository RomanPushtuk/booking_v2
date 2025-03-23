export abstract class Step<T, R> {
  name?: string;
  abstract invoke(params: T, ...args: unknown[]): Promise<R>;
  abstract withCompenstation(params: T, ...args: unknown[]): Promise<R>;
}

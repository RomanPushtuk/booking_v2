export abstract class Step<T, R> {
  name?: string;
  abstract invoke(params: T, ...args: unknown[]): Promise<R>;
  abstract withCompensation(params: T, ...args: unknown[]): Promise<R>;
}

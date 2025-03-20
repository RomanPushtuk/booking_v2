export type GetInterface<T> = {
  [key in keyof T]: T[key] extends object ? GetInterface<T[key]> : T[key];
};

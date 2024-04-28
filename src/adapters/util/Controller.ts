export type Request<T = Record<string, any>> = {
  body: T;
  headers: Record<string, any>;
};

export interface Controller<T, O> {
  run(request: Request<T>): O;
}

/**
 * Represents a request object with a body and headers.
 * @template T - Type of the body of the request.
 */
export type Request<T = Record<string, any>> = {
  body: T;
  headers: Record<string, any>;
};

/**
 * Represents a controller interface of the interface adapters layer
 * @template T - Type of the request body.
 * @template O - Type of the response.
 */
export interface Controller<T, O> {
  run(request: Request<T>): O;
}

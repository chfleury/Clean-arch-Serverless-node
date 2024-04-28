/**
 * Represents a use case interface with a run method.
 * @template I - Type of the input for the use case.
 * @template O - Type of the output of the use case.
 */
export interface UseCase<I, O> {
  run(input: I): Promise<O>;
}

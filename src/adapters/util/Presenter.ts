import { ValidationError } from "../validators/util/Validatable";

/**
 * Represents a presenter interface with methods to present data or errors.
 * @template I - Type of the input data to be presented.
 * @template O - Type of the output/result of the presentation.
 */
export interface Presenter<I, O> {
  present(data: I): O;
  presentValidationError(data: ValidationError): O;
}

import { ValidationError } from "../../validators/util/Validatable";

export interface Presenter<I, O> {
  present(data: I): O;
  presentValidationError(data: ValidationError): O;
}

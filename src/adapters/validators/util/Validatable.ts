import {
  ValidationError as ClassValidationError,
  validateSync,
} from "class-validator";

export type ValidationError = {
  errors: string[];
};

export abstract class Validatable<A> {
  constructor(private data: Partial<A>) {}

  export(): A {
    return this.data as A;
  }

  checkForErrors(): ValidationError | null {
    const validationResult = validateSync(this.data);

    const errors = this.getErrors(validationResult);

    return errors ? { errors } : null;
  }

  private getErrors(validationResult: ClassValidationError[]): string[] | null {
    const hasErrrors =
      validationResult instanceof Array &&
      validationResult.length &&
      validationResult[0] instanceof ClassValidationError;

    if (hasErrrors) {
      const validationErrors: string[] = [];
      validationResult.forEach((obj) => {
        const constraints = obj.constraints;

        for (const key in constraints) {
          if (typeof constraints?.[key] === "string" && constraints?.[key]) {
            validationErrors.push(constraints?.[key]!);
          }
        }
      });

      return validationErrors;
    }

    return null;
  }
}

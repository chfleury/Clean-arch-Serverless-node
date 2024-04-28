import { inject, injectable } from "inversify";
import {
  ExchangeService,
  ExchangeServiceSymbol,
} from "../../adapters/services/ExchangeService";
import {
  ExchangeCurrencyInput,
  ExchangeCurrencyOutput,
} from "../dtos/ExchangeCurrencyDto";
import { UseCase } from "../utils/UseCase";
import { left, right } from "../../shared/utils/Either";
import { Exception } from "../../shared/utils/Exception";
import {
  InternalServerError,
  UnsupportedCurrencyCodeException,
} from "../exceptions/applicationExceptions";

@injectable()
export class ExchangeCurrencyUseCase
  implements UseCase<ExchangeCurrencyInput, ExchangeCurrencyOutput>
{
  constructor(
    @inject(ExchangeServiceSymbol) private readonly service: ExchangeService
  ) {}

  async run(input: ExchangeCurrencyInput): Promise<ExchangeCurrencyOutput> {
    try {
      const exchangeRate = await this.service.getExchangeRate(input);

      if (exchangeRate.isLeft()) {
        return left(this.handleServiceError(exchangeRate.value));
      }

      const exchangeResult = this.calculateExchangeResult(
        exchangeRate.value,
        input.amount
      );

      return right({
        exchangeRate: exchangeRate.value,
        exchangeResult: exchangeResult,
      });
    } catch (err) {
      return left(InternalServerError);
    }
  }

  /**
   * Handles service errors by determining the appropriate exception to return based on the error type
   * the service has returned
   */
  private handleServiceError(error: Exception): Exception {
    if (error.kind === "unsupported-code") {
      return UnsupportedCurrencyCodeException;
    }

    return InternalServerError;
  }

  /**
   * Calculates the result of an exchange based on the exchange rate and amount.
   * @param {number} exchangeRate - The exchange rate to use for the calculation.
   * @param {number} amount - The amount to be exchanged.
   * @returns {number} The result of the exchange calculation.
   */
  private calculateExchangeResult(
    exchangeRate: number,
    amount: number
  ): number {
    return exchangeRate * amount;
  }
}

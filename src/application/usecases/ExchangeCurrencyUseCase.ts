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

  private handleServiceError(error: Exception): Exception {
    if (error.kind === "unsupported-code") {
      return UnsupportedCurrencyCodeException;
    }

    return InternalServerError;
  }

  private calculateExchangeResult(exchangeRate: number, amount: number) {
    return exchangeRate * amount;
  }
}

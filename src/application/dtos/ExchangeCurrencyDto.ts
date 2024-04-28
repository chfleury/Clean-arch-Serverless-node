import { Either } from "../../shared/utils/Either";
import { Exception } from "../../shared/utils/Exception";

export type ExchangeCurrencyInput = {
  baseCurrency: string;
  targetCurrency: string;
  amount: number;
};

export type ExchangeCurrencyUseCaseResponse = {
  exchangeResult: number;
  exchangeRate: number;
};

export type ExchangeCurrencyOutput = Either<
  Exception,
  ExchangeCurrencyUseCaseResponse
>;

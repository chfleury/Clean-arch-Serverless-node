import { Either } from "../utils/Either";
import { Exception } from "../utils/Exception";

export type ExchangeCurrencyInput = {
  baseCurrency: string;
  targetCurrency: string;
  amount: number;
};

export type ExchangeCurrencyOutput = Either<
  Exception,
  { exchangeResult: number; exchangeRate: number }
>;

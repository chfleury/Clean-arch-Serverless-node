import { Either } from "../../shared/utils/Either";
import { Exception } from "../../shared/utils/Exception";

export const ExchangeServiceSymbol = Symbol.for("ExchangeService");

export type GetExchangeRateInput = {
  baseCurrency: string;
  targetCurrency: string;
};

export type GetExchangeRateOutput = Either<Exception, number>;

export interface ExchangeService {
  getExchangeRate(input: GetExchangeRateInput): Promise<GetExchangeRateOutput>;
}

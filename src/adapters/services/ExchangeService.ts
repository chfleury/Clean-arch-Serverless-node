import { Either } from "../../shared/utils/Either";
import { Exception } from "../../shared/utils/Exception";

export const ExchangeServiceSymbol = Symbol.for("ExchangeService");

type GetExchangeRateInput = {
  baseCurrency: string;
  targetCurrency: string;
};

type GetExchangeRateOutput = Either<Exception, number>;

export interface ExchangeService {
  getExchangeRate(input: GetExchangeRateInput): Promise<GetExchangeRateOutput>;
}

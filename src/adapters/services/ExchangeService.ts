import { Either } from "../../application/utils/Either";
import { Exception } from "../../application/utils/Exception";

export const ExchangeServiceSymbol = Symbol.for("ExchangeService");

type GetExchangeRateInput = {
  baseCurrency: string;
  targetCurrency: string;
};

type GetExchangeRateOutput = Either<Exception, number>;

export interface ExchangeService {
  getExchangeRate(input: GetExchangeRateInput): Promise<GetExchangeRateOutput>;
}

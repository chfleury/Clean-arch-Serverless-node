import { injectable } from "inversify";
import { ExchangeService as ExchangeServiceInterface } from "../../adapters/services/ExchangeService";
import { Either, right } from "../../shared/utils/Either";
import { Exception } from "../../shared/utils/Exception";

@injectable()
export class ExchangeService implements ExchangeServiceInterface {
  // TODO
  async getExchangeRate(_input: {
    baseCurrency: string;
    targetCurrency: string;
  }): Promise<Either<Exception, number>> {
    return right(1.32);
  }
}

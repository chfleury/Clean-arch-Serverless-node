import { injectable } from "inversify";
import dotenv from "dotenv";

import {
  ExchangeService as ExchangeServiceInterface,
  GetExchangeRateInput,
  GetExchangeRateOutput,
} from "../../adapters/services/ExchangeService";
import { Left, left, right } from "../../shared/utils/Either";
import axios, { isAxiosError } from "axios";
import { Exception } from "../../shared/utils/Exception";
import {
  GeneralExchangeServiceError,
  UnsupportedCodeServiceException,
} from "../../adapters/exceptions/adaptersExceptions";

dotenv.config();

type ApiResponse = {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
};

type ApiError = {
  result: string;
  documentation: string;
  "terms-of-use": string;
  "error-type": string;
};

@injectable()
export class ExchangeService implements ExchangeServiceInterface {
  private readonly API_KEY: string = process.env["API_KEY"] ?? "";
  private readonly baseUrl: string = "https://v6.exchangerate-api.com/v6";

  async getExchangeRate({
    baseCurrency,
    targetCurrency,
  }: GetExchangeRateInput): Promise<GetExchangeRateOutput> {
    try {
      const response = await axios.get<ApiResponse>(
        `${this.baseUrl}/${this.API_KEY}/pair/${baseCurrency}/${targetCurrency}`
      );

      return right(response.data.conversion_rate);
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  private handleErrors(error: any): Left<Exception, any> {
    if (isAxiosError(error) && error.response?.status == 404) {
      const errorData: ApiError = error.response.data;

      if (errorData["error-type"] === "unsupported-code") {
        return left(UnsupportedCodeServiceException);
      }
    }

    return left(GeneralExchangeServiceError);
  }
}

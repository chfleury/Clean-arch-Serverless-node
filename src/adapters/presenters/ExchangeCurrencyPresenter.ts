import {
  ExchangeCurrencyOutput,
  ExchangeCurrencyUseCaseResponse,
} from "../../application/dtos/ExchangeCurrencyDto";
import { UnsupportedCurrencyCodeException } from "../../application/exceptions/applicationExceptions";
import { Exception } from "../../shared/utils/Exception";
import { Presenter } from "../util/Presenter";
import { View, ErrorView } from "../util/View";
import { ValidationError } from "../validators/util/Validatable";
export class ExchangeCurrencyPresenter
  implements
    Presenter<
      ExchangeCurrencyOutput,
      View<ExchangeCurrencyUseCaseResponse> | ErrorView
    >
{
  present(
    data: ExchangeCurrencyOutput
  ): View<ExchangeCurrencyUseCaseResponse> | ErrorView {
    if (data.isLeft()) {
      return this.presentError(data.value);
    }

    return this.presentSuccess(data.value);
  }

  presentValidationError(data: ValidationError): ErrorView {
    return {
      status: 400,
      data: {
        errorCode: "VAL_001",
        message: "One or more fields of the request failed validation",
        description: data.errors,
      },
    };
  }

  private presentError(err: Exception): ErrorView {
    if (err.kind === UnsupportedCurrencyCodeException.kind) {
      return {
        status: 400,
        data: {
          errorCode: "COD_001",
          message: err.message,
          description: null,
        },
      };
    }

    return {
      status: 500,
      data: {
        errorCode: "INT_001",
        message: "Internal Server Errror",
        description: null,
      },
    };
  }

  private presentSuccess({
    exchangeRate,
    exchangeResult,
  }: {
    exchangeResult: number;
    exchangeRate: number;
  }): View<ExchangeCurrencyUseCaseResponse> {
    return {
      status: 200,
      data: {
        exchangeResult: parseFloat(exchangeResult.toFixed(2)),
        exchangeRate,
      },
    };
  }
}

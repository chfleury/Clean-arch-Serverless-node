import { ExchangeCurrencyOutput } from "../../application/dtos/ExchangeCurrencyDto";
import { Exception } from "../../shared/utils/Exception";
import { ValidationError } from "../validators/util/Validatable";
import { Presenter } from "./util/Presenter";
import { ErrorView, View } from "./util/View";

export class ExchangeCurrencyPresenter
  implements Presenter<ExchangeCurrencyOutput, View | ErrorView>
{
  present(data: ExchangeCurrencyOutput): View | ErrorView {
    if (data.isLeft()) {
      return this.presentError(data.value);
    }

    return this.presentSuccess(data.value);
  }

  presentValidationError(data: ValidationError): View | ErrorView {
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
    if (err.kind === "unsuported-code") {
      return {
        status: 400,
        data: {
          errorCode: "COD_001",
          message: err.message,
          description: null,
        },
      };
    }

    // TODO rest of the errors

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
  }): View {
    return {
      status: 200,
      data: {
        exchangeResult,
        exchangeRate,
      },
    };
  }
}

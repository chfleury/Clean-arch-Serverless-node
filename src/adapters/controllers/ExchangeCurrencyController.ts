import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ExchangeCurrencyValidator } from "../validators/ExchangeCurrencyValidator";
import { ExchangeCurrencyUseCase } from "../../application/usecases/ExchangeCurrencyUseCase";
import { ExchangeCurrencyPresenter } from "../presenters/ExchangeCurrencyPresenter";
import { Controller, Request } from "../util/Controller";
import { ErrorView, View } from "../util/View";
import { ExchangeCurrencyUseCaseResponse } from "../../application/dtos/ExchangeCurrencyDto";

@injectable()
export class ExchangeCurrencyController
  implements
    Controller<
      ExchangeCurrencyValidator,
      Promise<View<ExchangeCurrencyUseCaseResponse> | ErrorView>
    >
{
  constructor(
    @inject(ExchangeCurrencyUseCase) private interactor: ExchangeCurrencyUseCase
  ) {}
  async run(
    req: Request<ExchangeCurrencyValidator>
  ): Promise<View<ExchangeCurrencyUseCaseResponse> | ErrorView> {
    const presenter = new ExchangeCurrencyPresenter();

    const validatedRequest = new ExchangeCurrencyValidator({
      amount: req?.body?.amount?.toString(),
      baseCurrency: req?.body?.baseCurrency,
      targetCurrency: req?.body?.targetCurrency,
    });

    const validationErrors = validatedRequest.checkForErrors();

    if (validationErrors?.errors?.length) {
      return presenter.presentValidationError(validationErrors);
    }

    const validatedData = validatedRequest.export();

    const result = await this.interactor.run({
      ...validatedData,
      amount: parseFloat(validatedData.amount),
    });

    return presenter.present(result);
  }
}

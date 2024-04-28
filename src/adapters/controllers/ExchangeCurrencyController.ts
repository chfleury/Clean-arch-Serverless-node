import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ExchangeCurrencyValidator } from "../validators/ExchangeCurrencyValidator";
import { UseCase } from "../../application/utils/UseCase";
import { ExchangeCurrencyUseCase } from "../../application/usecases/ExchangeCurrencyUseCase";
import { ExchangeCurrencyPresenter } from "../presenters/ExchangeCurrencyPresenter";

@injectable()
export class ExchangeCurrencyController {
  constructor(
    @inject(ExchangeCurrencyUseCase) private interactor: UseCase<any, any>
  ) {}
  async run(
    req: any // TODO
  ): Promise<any> {
    const presenter = new ExchangeCurrencyPresenter();

    const validatedRequest = new ExchangeCurrencyValidator({
      amount: req?.body?.amount,
      baseCurrency: req?.body?.baseCurrency,
      targetCurrency: req?.body?.targetCurrency,
    });

    const validationErrors = validatedRequest.checkForErrors();

    if (validationErrors) {
      return presenter.presentValidationError(validationErrors);
    }

    const result = await this.interactor.run(validatedRequest.export());

    return presenter.present(result);
  }
}

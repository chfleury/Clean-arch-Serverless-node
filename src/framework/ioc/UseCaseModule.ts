import { ContainerModule, interfaces } from "inversify";
import { ExchangeCurrencyUseCase } from "../../application/usecases/ExchangeCurrencyUseCase";

export const UseCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(ExchangeCurrencyUseCase).toSelf();
});

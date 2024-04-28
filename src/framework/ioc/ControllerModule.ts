import { ContainerModule, interfaces } from "inversify";
import { ExchangeCurrencyController } from "../../adapters/controllers/ExchangeCurrencyController";

export const ControllerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(ExchangeCurrencyController).toSelf();
});

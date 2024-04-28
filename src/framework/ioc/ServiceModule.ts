import { ContainerModule, interfaces } from "inversify";

import { ExchangeService } from "../services/ExchangeService";
import {
  ExchangeService as ExchangeServiceInterface,
  ExchangeServiceSymbol,
} from "../../adapters/services/ExchangeService";

export const ServiceModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ExchangeServiceInterface>(ExchangeServiceSymbol).to(ExchangeService);
});

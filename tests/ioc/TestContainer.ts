import "reflect-metadata";
import { Container } from "inversify";

import { UseCaseModule } from "../../src/framework/ioc/UseCaseModule";
import { mockExchangeService } from "../utils/mocks/ExchangeServiceMock";

const testContainer = new Container();

testContainer.load(UseCaseModule);

mockExchangeService(testContainer);

export { testContainer };

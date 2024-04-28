import "reflect-metadata";
import { Container } from "inversify";
import {
  ExchangeService as ExchangeServiceInterface,
  ExchangeServiceSymbol,
} from "../../../src/adapters/services/ExchangeService";
import { right } from "../../../src/shared/utils/Either";

export const exchangeServiceMock: ExchangeServiceInterface = {
  getExchangeRate: jest.fn().mockResolvedValue(right(1.15)),
};

export function mockExchangeService(container: Container): void {
  container.bind(ExchangeServiceSymbol).toConstantValue(exchangeServiceMock);
}

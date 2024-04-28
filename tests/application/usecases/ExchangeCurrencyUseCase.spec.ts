import "reflect-metadata";
import { ExchangeCurrencyUseCase } from "../../../src/application/usecases/ExchangeCurrencyUseCase";
import { testContainer } from "../../ioc/TestContainer";
import { exchangeServiceMock } from "../../utils/mocks/ExchangeServiceMock";
import { left } from "../../../src/shared/utils/Either";
import { UnsupportedCurrencyCodeException } from "../../../src/application/exceptions/applicationExceptions";
import { UnsupportedCodeServiceException } from "../../../src/adapters/exceptions/adaptersExceptions";

const sut = testContainer.get(ExchangeCurrencyUseCase);

describe("ExchangeCurrencyUseCase", () => {
  test("should succesfuly exchange currencies", async () => {
    const input = {
      amount: 1,
      baseCurrency: "usd",
      targetCurrency: "brl",
    };

    const spy = jest.spyOn(exchangeServiceMock, "getExchangeRate");

    const result = await sut.run(input);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight).toBeTruthy();

    if (result.isRight()) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result.value).toHaveProperty("exchangeResult");
      expect(result.value).toHaveProperty("exchangeRate");
      expect(result.value?.exchangeResult).toBe(
        result.value.exchangeRate * input.amount
      );
    }
  });

  test("should return left if currency code is not suported", async () => {
    const input = {
      amount: 50,
      baseCurrency: "invalid_code",
      targetCurrency: "brl",
    };

    jest
      .spyOn(exchangeServiceMock, "getExchangeRate")
      .mockResolvedValueOnce(left(UnsupportedCodeServiceException));

    const result = await sut.run(input);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();

    expect(result.value).toStrictEqual(UnsupportedCurrencyCodeException);
  });
});

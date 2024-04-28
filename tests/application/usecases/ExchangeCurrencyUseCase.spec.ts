import "reflect-metadata";
import { ExchangeCurrencyUseCase } from "../../../src/application/usecases/ExchangeCurrencyUseCase";
import { testContainer } from "../../ioc/TestContainer";

const sut = testContainer.get(ExchangeCurrencyUseCase);

describe("ExchangeCurrencyUseCase", () => {
  test("should succesfuly exchange currencies", async () => {
    const result = await sut.run({
      amount: 1,
      baseCurrency: "usd",
      targetCurrency: "brl",
    });

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight).toBeTruthy();

    expect(result.value).toHaveProperty("exchangeResult");
  });
});

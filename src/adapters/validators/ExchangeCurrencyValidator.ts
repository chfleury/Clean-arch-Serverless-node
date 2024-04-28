import { IsDecimal, IsString, IsISO4217CurrencyCode } from "class-validator";
import { Validatable } from "./util/Validatable";

export class ExchangeCurrencyValidator extends Validatable<ExchangeCurrencyValidator> {
  @IsString()
  @IsISO4217CurrencyCode()
  baseCurrency!: string;

  @IsString()
  @IsISO4217CurrencyCode()
  targetCurrency!: string;

  @IsDecimal(
    {
      decimal_digits: "2",
    },
    {
      message:
        "Invalid number format. Must be a number with at most 2 decimal places.",
    }
  )
  amount!: number;
}

import { Exception } from "../../shared/utils/Exception";

export const UnsupportedCurrencyCodeException: Exception = {
  kind: "unsupported-currency-code",
  message: "The Base or Target currency code is not supported",
};

export const InternalServerError: Exception = {
  kind: "internal-server-error",
  message: "Something unexpected happend",
};

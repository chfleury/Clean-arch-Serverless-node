import { Exception } from "../../shared/utils/Exception";

export const GeneralExchangeServiceError: Exception = {
  kind: "general-service-error",
  message: "Exchange Service failed with a general error",
};

export const UnsupportedCodeServiceException: Exception = {
  kind: "unsupported-code",
  message: "Either the base or target code are unsupported",
};

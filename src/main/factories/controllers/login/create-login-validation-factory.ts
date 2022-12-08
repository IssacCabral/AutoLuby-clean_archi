import { LoginValidator } from "@validators/login-validation";

export const makeLoginValidation = (): LoginValidator  => {
  return new LoginValidator()
}
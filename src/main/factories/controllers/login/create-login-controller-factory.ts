import { LoginController } from "@controllers/login/login-controller"
import {makeLoginValidation} from './create-login-validation-factory'
import { BcryptAdapter } from "@cryptography/bcrypt-adapter/bcrypt-adapter"
import { makeDbLogin } from "@factories/usecases/db-login-factory"

export const makeLoginController = (): LoginController => {
  const controller = new LoginController(makeLoginValidation(), makeDbLogin())
  return controller
}
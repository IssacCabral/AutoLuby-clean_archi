import { LoginController } from "@controllers/login/login-controller"
import {makeLoginValidation} from './create-login-validation-factory'
import { makeDbLogin } from "@factories/usecases/login/db-login-factory"

export const makeLoginController = (): LoginController => {
  const controller = new LoginController(makeLoginValidation(), makeDbLogin())
  return controller
}
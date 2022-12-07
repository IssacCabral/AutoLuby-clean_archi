import { CreateUserController } from "@controllers/create-user/create-user-controller"
import { makeDbCreateUser } from "@factories/usecases/db-create-user-factory" 
import { makeCreateUserValidation } from "./create-user-validation-factory"

export const makeCreateUserController = (): CreateUserController => {
  const controller = new CreateUserController(makeDbCreateUser(), makeCreateUserValidation())
  return controller
}
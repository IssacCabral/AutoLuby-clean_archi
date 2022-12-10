import { CreateUserValidator } from "@validators/create-user-validation"

export const makeCreateUserValidation = (): CreateUserValidator => {
  return new CreateUserValidator()
}
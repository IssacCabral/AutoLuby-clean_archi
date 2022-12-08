import { InvalidParamError } from "@errors/invalid-param-error";
import { IValidation } from "@protocols/validation";
import validator from "validator";

export class LoginValidator implements IValidation{
  validate(input: any): Error {
    const {email} = input
    const isEmailValid = validator.isEmail(email)
    if(!isEmailValid) return new InvalidParamError('email')
    return null
  }
}
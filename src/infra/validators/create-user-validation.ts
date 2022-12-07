import { InvalidParamError } from "@errors/invalid-param-error";
import { IValidation } from "@protocols/validation";
import validator from 'validator'

export class CreateUserValidator implements IValidation{
  validate(input: any): Error | null {
    const {cpf, email, password} = input

    const isEmailValid = validator.isEmail(email)
    if(!isEmailValid) return new InvalidParamError('email')

    const isValidPassword = password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/g)
    if(!isValidPassword) return new InvalidParamError('password')

    const isValidCpf = cpf.match(/^\d{3}.\d{3}.\d{3}-\d{2}$/)
    if(!isValidCpf) return new InvalidParamError('cpf')

    return null
  }

}
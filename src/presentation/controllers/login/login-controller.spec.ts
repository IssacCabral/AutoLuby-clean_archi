import { IAuthentication } from "@domain/usecases/authentication"
import { ServerError } from "@errors/server-error"
import { unauthorized } from "@helpers/http-helper"
import { HttpRequest } from "@protocols/http"
import { IValidation } from "@protocols/validation"
import { LoginController } from "./login-controller"

const makeAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication{
    async auth(email: string, password: string): Promise<string>{
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

const makeFakeLoginRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  }
}

const makeLoginValidation = (): IValidation => {
  class LoginValidatorStub implements IValidation{
    validate(input: any): Error {
      return null
    }
  }
  return new LoginValidatorStub()
}

interface SutTypes{
  sut: LoginController
  loginValidatorStub: IValidation
  authenticationStub: IAuthentication
}

const makeSut = (): SutTypes => {
  const loginValidatorStub = makeLoginValidation()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(loginValidatorStub, authenticationStub)
  return {
    sut,
    loginValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
  })

  test('Should return 400 if no password is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should call Validation with correct values', async () => {
    const {sut, loginValidatorStub} = makeSut()
    const isValidSpy = jest.spyOn(loginValidatorStub, 'validate')
    const httpRequest = makeFakeLoginRequest()
    await sut.handle(makeFakeLoginRequest())
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const {sut, loginValidatorStub} = makeSut()
    jest.spyOn(loginValidatorStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeLoginRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBeInstanceOf(Error)
  })

  test('Should return 500 if Validation throws', async () => {
    const {sut, loginValidatorStub} = makeSut()
    jest.spyOn(loginValidatorStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeLoginRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call Authentication with correct values', async () => {
    const {sut, authenticationStub} = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeLoginRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should return 401 if invalid credentials is provided', async () => {
    const {sut, authenticationStub} = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeLoginRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  // test('Should return 500 if Authentication throws', async () => {
  //   const {sut, authenticationStub} = makeSut()
  //   jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
  //     throw new Error()
  //   })
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(serverError(new Error()))
  // })

  // test('Should return 200 if valid credentials is provided', async () => {
  //   const {sut} = makeSut()
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(ok({accessToken: 'any_token'}))
  // })
})
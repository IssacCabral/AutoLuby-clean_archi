import { IFindUserByEmailRepository } from "@data/protocols/find-user-by-email-repository"
import { UserModel } from "@domain/models/user"
import { DbAuthentication } from "./db-authentication"

const makeFakeUser = (): UserModel => {
  return {
    id: "valid_id",
    email: "valid_email@mail.com",
    password: "hashed_password",
    name: "valid_name",
    cpf: "valid_cpf",
    biography: "lorem ipsum",
    wage: 1000,
    createdAt: new Date(2022, 9, 1),
    updatedAt: new Date(2022, 9, 1),
  };
};

const makeFakeAuthRequest = () => {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

const makeFindUserByEmailRepository = (): IFindUserByEmailRepository => {
  class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository{
    async findByEmail(email: string): Promise<UserModel> {
      return makeFakeUser()
    }
  }
  return new FindUserByEmailRepositoryStub()
}

interface SutTypes{
  sut: DbAuthentication
  findUserByEmailRepositoryStub: IFindUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new DbAuthentication(findUserByEmailRepositoryStub)
  return {
    sut,
    findUserByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call FindUserByEmailRepository with correct email', async () => {
    const {sut, findUserByEmailRepositoryStub} = makeSut()
    const findUserByEmailSpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')
    const authParams = makeFakeAuthRequest()
    await sut.auth(authParams.email, authParams.password)
    expect(findUserByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if FindUserByEmailRepository throws', async () => {
    const {sut, findUserByEmailRepositoryStub} = makeSut()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockImplementationOnce(() => {throw new Error()})
    const authParams = makeFakeAuthRequest()
    const promise = sut.auth(authParams.email, authParams.password)
    await expect(promise).rejects.toThrow()
  })

})
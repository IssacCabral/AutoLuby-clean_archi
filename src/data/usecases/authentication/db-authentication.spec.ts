import { IFindUserByEmailRepository } from "@data/protocols/user/find-user-by-email-repository"
import { IHashComparer } from "@data/protocols/cryptography/hash-comparer"
import { ITokenGenerator } from "@data/protocols/cryptography/token-generator"
import { IUpdateAccessTokenRepository } from "@data/protocols/user/update-access-token-repository"
import { UserModel } from "@domain/models/user"
import { InvalidCredentialsError } from "@errors/invalid-credentials-error"
import { DbAuthentication } from "./db-authentication"

const makeHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer{
    async compare(value: string, hash: string): Promise<boolean>{
      return true
    }
  }
  return new HashComparerStub()
}

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

const makeTokenGenerator = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator{
    async generate(id: string): Promise<string>{
      return 'any_token'
    }
  }
  return new TokenGeneratorStub()
}

const makeUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository{
    async update(id: string, token: string): Promise<void>{
      
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes{
  sut: DbAuthentication
  findUserByEmailRepositoryStub: IFindUserByEmailRepository
  hashComparerStub: IHashComparer
  tokenGeneratorStub: ITokenGenerator
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    findUserByEmailRepositoryStub, 
    hashComparerStub, 
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    findUserByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
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

  test('Should returns InvalidCredentialsError if FindUserByEmailRepository returs null', async () => {
    const {sut, findUserByEmailRepositoryStub} = makeSut()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockReturnValue(null)
    const authParams = makeFakeAuthRequest()
    const result = await sut.auth(authParams.email, authParams.password)
    expect(result).toEqual(new InvalidCredentialsError())
  })

  test('Should call HashComparer with correct values', async () => {
    const {sut, hashComparerStub} = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const authParams = makeFakeAuthRequest()
    await sut.auth(authParams.email, authParams.password)
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const {sut, hashComparerStub} = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {throw new Error()})
    const authParams = makeFakeAuthRequest()
    const promise = sut.auth(authParams.email, authParams.password)
    await expect(promise).rejects.toThrow()
  })

  test('Should returns InvalidCredentialsError if HashComparer returns false', async () => {
    const {sut, hashComparerStub} = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValue(new Promise((resolve, reject) => resolve(false)))
    const authParams = makeFakeAuthRequest()
    const result = await sut.auth(authParams.email, authParams.password)
    expect(result).toEqual(new InvalidCredentialsError())
  })

  test('Should call TokenGenerator with correct id', async () => {
    const {sut, tokenGeneratorStub} = makeSut()
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    const authParams = makeFakeAuthRequest()
    await sut.auth(authParams.email, authParams.password)
    expect(tokenGeneratorSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    const {sut, tokenGeneratorStub} = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockImplementationOnce(() => {throw new Error()})
    const authParams = makeFakeAuthRequest()
    const promise = sut.auth(authParams.email, authParams.password)
    await expect(promise).rejects.toThrow()
  })

  test('Should returns a token on success', async () => {
    const {sut} = makeSut()
    const authParams = makeFakeAuthRequest()
    const result = await sut.auth(authParams.email, authParams.password)
    expect(result).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const {sut, updateAccessTokenRepositoryStub} = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    const authParams = makeFakeAuthRequest()
    await sut.auth(authParams.email, authParams.password)
    expect(updateSpy).toHaveBeenCalledWith('valid_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const {sut, updateAccessTokenRepositoryStub} = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockImplementationOnce(() => {throw new Error()})
    const authParams = makeFakeAuthRequest()
    const promise = sut.auth(authParams.email, authParams.password)
    await expect(promise).rejects.toThrow()
  })
})
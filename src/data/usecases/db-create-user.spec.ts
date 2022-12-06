import { ICreateUserRepository } from "@data/protocols/create-user-repository";
import { IEncrypter } from "@data/protocols/encrypter";
import { IFindUserByCpfRepository } from "@data/protocols/find-user-by-cpf-repository";
import { IFindUserByEmailRepository } from "@data/protocols/find-user-by-email-repository";
import { UserModel } from "@domain/models/user";
import { CreateUserParams } from "@domain/types/create-user-params";
import { DbCreateUser } from "./db-create-user";

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

const makeFakeCreateUserParams = (): CreateUserParams => {
  return {
    email: "valid_email@mail.com",
    password: "valid_password",
    name: "valid_name",
    cpf: "valid_cpf",
    biography: "lorem ipsum",
    wage: 1000,
  };
};

const makeCreateUserRepository = (): ICreateUserRepository => {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create(userData: CreateUserParams): Promise<UserModel> {
      const fakeUser = makeFakeUser()
      return fakeUser;
    }
  }
  return new CreateUserRepositoryStub();
};

const makeFindUserByCpfRepository = (): IFindUserByCpfRepository => {
  class FindUserByCpfRepositoryStub implements IFindUserByCpfRepository{
    findByCpf(cpf: string): Promise<UserModel> {
      return null
    }
  }
  return new FindUserByCpfRepositoryStub()
}

const makeFindUserByEmailRepository = (): IFindUserByEmailRepository => {
  class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository{
    findByEmail(email: string): Promise<UserModel> {
      return null
    }
  }
  return new FindUserByEmailRepositoryStub()
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt(value: string): Promise<string> {
      return "hashed_password";
    }
  }
  return new EncrypterStub();
};

interface SutTypes{
  sut: DbCreateUser,
  createUserRepositoryStub: ICreateUserRepository,
  findUserByCpfRepositoryStub: IFindUserByCpfRepository,
  findUserByEmailRepositoryStub: IFindUserByEmailRepository
  encrypterStub: IEncrypter,
}

const makeSut = (): SutTypes => {
  const createUserRepositoryStub = makeCreateUserRepository()
  const findUserByCpfRepositoryStub = makeFindUserByCpfRepository()
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbCreateUser(createUserRepositoryStub, findUserByCpfRepositoryStub, findUserByEmailRepositoryStub, encrypterStub)
  return {
    sut,
    createUserRepositoryStub,
    findUserByCpfRepositoryStub,
    findUserByEmailRepositoryStub,
    encrypterStub
  }
}

describe("DbCreateUser UseCase", () => {
  test("Should call encrypter with correct password", async () => {
    const {sut, encrypterStub} = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.create(makeFakeCreateUserParams())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  });

  test('Should throw if Encrypter throws', async () => {
    const {sut, encrypterStub} = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {throw new Error()})
    const promise = sut.create(makeFakeCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CreateUserRepository with correct values', async () => {
    const {sut, createUserRepositoryStub} = makeSut()
    const createUserSpy = jest.spyOn(createUserRepositoryStub, 'create')
    const createUserParams = {
      email: "valid_email@mail.com",
      password: "valid_password",
      name: "valid_name",
      cpf: "valid_cpf",
      biography: "lorem ipsum",
      wage: 1000
    }
    await sut.create(createUserParams)
    expect(createUserSpy).toHaveBeenCalledWith({
      email: "valid_email@mail.com",
      password: "hashed_password",
      name: "valid_name",
      cpf: "valid_cpf",
      biography: "lorem ipsum",
      wage: 1000
    })
  })
});

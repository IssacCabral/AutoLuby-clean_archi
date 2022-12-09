import { ICreateUserRepository } from "@data/protocols/user/create-user-repository";
import { IHasher } from "@data/protocols/cryptography/hasher";
import { IFindUserByCpfRepository } from "@data/protocols/user/find-user-by-cpf-repository";
import { IFindUserByEmailRepository } from "@data/protocols/user/find-user-by-email-repository";
import { UserModel } from "@domain/models/user";
import { CreateUserParams } from "@domain/types/create-user-params";
import { FieldInUseError } from "@errors/field-in-use-error";
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

const makeHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash(value: string): Promise<string> {
      return "hashed_password";
    }
  }
  return new HasherStub();
};

interface SutTypes{
  sut: DbCreateUser,
  createUserRepositoryStub: ICreateUserRepository,
  findUserByCpfRepositoryStub: IFindUserByCpfRepository,
  findUserByEmailRepositoryStub: IFindUserByEmailRepository
  hasherStub: IHasher,
}

const makeSut = (): SutTypes => {
  const createUserRepositoryStub = makeCreateUserRepository()
  const findUserByCpfRepositoryStub = makeFindUserByCpfRepository()
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const hasherStub = makeHasher()
  const sut = new DbCreateUser(createUserRepositoryStub, findUserByCpfRepositoryStub, findUserByEmailRepositoryStub, hasherStub)
  return {
    sut,
    createUserRepositoryStub,
    findUserByCpfRepositoryStub,
    findUserByEmailRepositoryStub,
    hasherStub
  }
}

describe("DbCreateUser UseCase", () => {
  test("Should call hasher with correct password", async () => {
    const {sut, hasherStub} = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.create(makeFakeCreateUserParams())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  });

  test('Should throw if Hasher throws', async () => {
    const {sut, hasherStub} = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {throw new Error()})
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

  test('Should throw if CreateUserRepository throws', async () => {
    const {sut, createUserRepositoryStub} = makeSut()
    jest.spyOn(createUserRepositoryStub, 'create').mockImplementationOnce(() => {throw new Error()})
    const promise = sut.create(makeFakeCreateUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return FieldInUseError if cpf already exists', async () => {
    const {sut, findUserByCpfRepositoryStub} = makeSut()
    const fakeUser = makeFakeUser()
    jest.spyOn(findUserByCpfRepositoryStub, 'findByCpf').mockReturnValueOnce(new Promise((resolve, reject) => resolve(fakeUser)))
    const createUserParams = makeFakeCreateUserParams()
    const result = await sut.create(createUserParams)
    expect(result).toEqual(new FieldInUseError("cpf"))
  })

  test('Should return FieldInUseError if email already exists', async () => {
    const {sut, findUserByEmailRepositoryStub} = makeSut()
    const fakeUser = makeFakeUser()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockReturnValueOnce(new Promise((resolve, reject) => resolve(fakeUser)))
    const createUserParams = makeFakeCreateUserParams()
    const result = await sut.create(createUserParams)
    expect(result).toEqual(new FieldInUseError("email"))
  })

  test('Should return an User with success', async () => {
    const {sut} = makeSut()
    const user = await sut.create(makeFakeCreateUserParams()) as UserModel
    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.cpf).toBe('valid_cpf')
  })
});

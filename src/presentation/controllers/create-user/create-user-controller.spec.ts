import { UserModel } from "@domain/models/user";
import { CreateUserParams } from "@domain/types/create-user-params";
import { ICreateUser } from "@domain/usecases/create-user";
import { FieldInUseError } from "@errors/field-in-use-error";
import { MissingParamError } from "@errors/missing-param-error";
import { ServerError } from "@errors/server-error";
import { badRequest,  } from "@helpers/http-helper";
import { HttpRequest } from "@protocols/http";
import { IValidation } from "@protocols/validation";
import { CreateUserController } from "./create-user-controller";

const makeFakeCreateUserRequest = (): HttpRequest => {
  return {
    body: {
      email: "valid_email@mail.com",
      password: "valid_password",
      name: "valid_name",
      cpf: "valid_cpf",
      biography: "lorem ipsum",
      wage: 1000,
    }
  };
};

const makeCreateUser = (): ICreateUser => {
  class CreateUserStub implements ICreateUser {
    async create(params: CreateUserParams): Promise<Error | UserModel> {
      const fakeUser: UserModel = {
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
      return fakeUser;
    }
  }
  return new CreateUserStub();
};

const makeCreateUserValidation = (): IValidation => {
  class CreateUserValidatorStub implements IValidation{
    validate(input: any): Error {
      return null
    }
  }
  return new CreateUserValidatorStub()
}

interface SutTypes {
  sut: CreateUserController;
  createUserStub: ICreateUser;
  createUserValidationStub: IValidation;
}

const makeSut = (): SutTypes => {
  const createUserStub = makeCreateUser();
  const createUserValidationStub = makeCreateUserValidation()
  const sut = new CreateUserController(createUserStub, createUserValidationStub)
  return {
    sut,
    createUserStub,
    createUserValidationStub
  }
};

describe("CreateUser Controller", () => {
  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "valid_password",
        name: "valid_name",
        cpf: "valid_cpf",
        biography: "lorem ipsum",
        wage: 1000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email@mail.com",
        name: "valid_name",
        cpf: "valid_cpf",
        biography: "lorem ipsum",
        wage: 1000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email@mail.com",
        password: "valid_password",
        cpf: "valid_cpf",
        biography: "lorem ipsum",
        wage: 1000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no cpf is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email@mail.com",
        password: "valid_password",
        name: "valid_name",
        biography: "lorem ipsum",
        wage: 1000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("cpf"));
  });

  test("Should return 400 if no biography is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email@mail.com",
        password: "valid_password",
        name: "valid_name",
        cpf: "valid_cpf",
        wage: 1000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("biography"));
  });

  test("Should return 400 if no wage is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email@mail.com",
        password: "valid_password",
        name: "valid_name",
        cpf: "valid_cpf",
        biography: "lorem ipsum"
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("wage"));
  });

  test("Should return 500 if CreateUser throws", async () => {
    const { sut, createUserStub } = makeSut();
    jest.spyOn(createUserStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeCreateUserRequest());
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call CreateUser with correct values", async () => {
    const { sut, createUserStub } = makeSut();
    const createSpy = jest.spyOn(createUserStub, "create");
    await sut.handle(makeFakeCreateUserRequest());
    expect(createSpy).toHaveBeenCalledWith({
      email: "valid_email@mail.com",
      password: "valid_password",
      name: "valid_name",
      cpf: "valid_cpf",
      biography: "lorem ipsum",
      wage: 1000,
    });
  });

  test('Should return 400 if CreateUser returns a FieldInUseError', async () => {
    const {sut, createUserStub} = makeSut()
    jest.spyOn(createUserStub, 'create').mockReturnValueOnce(new Promise((resolve) => resolve(new FieldInUseError('cpf'))))
    const httpResponse = await sut.handle(makeFakeCreateUserRequest())
    expect(httpResponse).toEqual(badRequest(new FieldInUseError('cpf')))
  })

  test('Should return 400 if Validation returns an error', async () => {
    const {sut, createUserValidationStub} = makeSut()
    jest.spyOn(createUserValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeCreateUserRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBeInstanceOf(Error)
  })

  test("Should return 201 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email@mail.com",
        password: "hashed_password",
        name: "valid_name",
        cpf: "valid_cpf",
        biography: "lorem ipsum",
        wage: 1000,
      }
    };
    const httpResponse = await sut.handle(makeFakeCreateUserRequest());
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toMatchObject(httpRequest.body)
  });
});

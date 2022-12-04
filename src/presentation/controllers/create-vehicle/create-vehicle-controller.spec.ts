import { VehicleModel } from "@domain/models/vehicle";
import { CreateVehicleParams } from "@domain/types/create-vehicle-params";
import { ICreateVehicle } from "@domain/usecases/create-vehicle";
import { FieldInUseError } from "@errors/field-in-use-error";
import { MissingParamError } from "@errors/missing-param-error";
import { ServerError } from "@errors/server-error";
import { HttpRequest } from "@protocols/http";
import { CreateVehicleController } from "./create-vehicle-controller";
import { badRequest } from "@helpers/http-helper";
import { IValidation } from "@protocols/validation";

const makeFakeCreateVehicleRequest = (): HttpRequest => {
  return {
    body: {
      brand: "any_brand",
      chassis: "any_chassis",
      color: "any_color",
      cost_price: 0,
      sale_price: 0,
      km: 0,
      model: "any_model",
      status: "any_status",
      year: 2000,
    },
  };
};

const makeCreateVehicle = (): ICreateVehicle => {
  class CreateVehicleStub implements ICreateVehicle {
    async create(params: CreateVehicleParams): Promise<Error | VehicleModel> {
      const fakeVehicle: VehicleModel = {
        id: "valid_id",
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
        createdAt: new Date(2022, 9, 1),
        updatedAt: new Date(2022, 9, 1),
      };
      return fakeVehicle;
    }
  }
  return new CreateVehicleStub();
};

const makeCreateVehicleValidation = (): IValidation => {
  class CreateVehicleValidatorStub implements IValidation{
    validate(input: any): Error {
      return null
    }
  }
  return new CreateVehicleValidatorStub()
}

interface SutTypes {
  sut: CreateVehicleController;
  createVehicleStub: ICreateVehicle;
  createVehicleValidationStub: IValidation
}

const makeSut = (): SutTypes => {
  const createVehicleStub = makeCreateVehicle();
  const createVehicleValidationStub = makeCreateVehicleValidation()
  const sut = new CreateVehicleController(createVehicleStub, createVehicleValidationStub);
  return {
    sut,
    createVehicleStub,
    createVehicleValidationStub
  };
};

describe("CreateVehicle Controller", () => {
  test("Should return 400 if no model is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("model"));
  });

  test("Should return 400 if no brand is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("brand"));
  });

  test("Should return 400 if no status is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "valid_model",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("status"));
  });

  test("Should return 400 if no year is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("year"));
  });

  test("Should return 400 if no km is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("km"));
  });

  test("Should return 400 if no color is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("color"));
  });

  test("Should return 400 if no chassis is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("chassis"));
  });

  test("Should return 400 if no sale_price is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("sale_price"));
  });

  test("Should return 400 if no cost_price is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        sale_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("cost_price"));
  });

  test("Should return 500 if CreateVehicle throws", async () => {
    const { sut, createVehicleStub } = makeSut();
    jest.spyOn(createVehicleStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeCreateVehicleRequest());
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call CreateVehicle with correct values", async () => {
    const { sut, createVehicleStub } = makeSut();
    const createSpy = jest.spyOn(createVehicleStub, "create");
    await sut.handle(makeFakeCreateVehicleRequest());
    expect(createSpy).toHaveBeenCalledWith({
      brand: "any_brand",
      chassis: "any_chassis",
      color: "any_color",
      cost_price: 0,
      sale_price: 0,
      km: 0,
      model: "any_model",
      status: "any_status",
      year: 2000,
    });
  });

  test('Should return 400 if CreateVehicle returns a FieldInUseError', async () => {
    const {sut, createVehicleStub} = makeSut()
    const httpRequest = makeFakeCreateVehicleRequest()
    jest.spyOn(createVehicleStub, 'create').mockReturnValueOnce(new Promise((resolve) => resolve(new FieldInUseError('chassis'))))
    const httpResponse = await sut.handle(makeFakeCreateVehicleRequest())
    expect(httpResponse).toEqual(badRequest(new FieldInUseError('chassis')))
  })

  test("Should return 201 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "valid_model",
        status: "valid_status",
        year: 2000,
      },
    };
    const httpResponse = await sut.handle(makeFakeCreateVehicleRequest());
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toMatchObject(httpRequest.body)
  });
});

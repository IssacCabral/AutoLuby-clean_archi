import { VehicleModel } from "@domain/models/vehicle";
import { CreateVehicleParams } from "@domain/types/create-vehicle-params";
import { CreateVehicleRepository } from "../protocols/create-vehicle-repository";
import { DbCreateVehicle } from "./db-create-vehicle";

const makeFakeCreateVehicleParams = (): CreateVehicleParams => {
  return {
    brand: "any_brand",
    chassis: "any_chassis",
    color: "any_color",
    cost_price: 0,
    sale_price: 0,
    km: 0,
    model: "any_model",
    status: "any_status",
    year: 2000,
  };
};

const makeCreateVehicleRepository = (): CreateVehicleRepository => {
  class CreateVehicleRepositoryStub implements CreateVehicleRepository {
    async create(vehicleData: CreateVehicleParams): Promise<VehicleModel> {
      const fakeVehicle: VehicleModel = {
        id: "any_id",
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
        createdAt: new Date(2022, 9, 1),
        updatedAt: new Date(2022, 9, 1),
      };
      return fakeVehicle;
    }
  }
  return new CreateVehicleRepositoryStub();
};

interface SutTypes {
  sut: DbCreateVehicle;
  createVehicleRepositoryStub: CreateVehicleRepository;
}

const makeSut = (): SutTypes => {
  const createVehicleRepositoryStub = makeCreateVehicleRepository();
  const sut = new DbCreateVehicle(createVehicleRepositoryStub);
  return {
    sut,
    createVehicleRepositoryStub,
  };
};

describe("DbCreateVehicle UseCase", () => {
  test("Should calls CreateVehicleRepository with correct values", async () => {
    const { sut, createVehicleRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createVehicleRepositoryStub, "create");
    const createVehicleParams: CreateVehicleParams = makeFakeCreateVehicleParams();
    await sut.create(createVehicleParams);
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

  test('Should throw if CreateVehicleRepository throws', async() => {
    const {sut, createVehicleRepositoryStub} = makeSut()
    jest.spyOn(createVehicleRepositoryStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const createVehicleParams: CreateVehicleParams = makeFakeCreateVehicleParams()
    const promise = sut.create(createVehicleParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a vehicle on success', async () => {
    const {sut} = makeSut()
    const createVehicleParams: CreateVehicleParams = makeFakeCreateVehicleParams();
    const vehicle = await sut.create(createVehicleParams) as VehicleModel
    expect(vehicle).toBeTruthy()
    expect(vehicle.id).toBeTruthy()
    expect(vehicle.brand).toBe('any_brand')
    expect(vehicle.chassis).toBe('any_chassis')
  })
});

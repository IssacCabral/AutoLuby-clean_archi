import { VehicleModel } from "../../domain/models/vehicle";
import { CreateVehicleParams } from "../../domain/types/create-vehicle-params";
import { CreateVehicleRepository } from "../protocols/create-vehicle-repository";
import { DbCreateVehicle } from "./db-create-vehicle";

const makeFakeCreateVehicleParams = (): CreateVehicleParams => {
  return {
    brand: "valid_brand",
    chassis: "valid_chassis",
    color: "valid_color",
    cost_price: 0,
    sale_price: 0,
    km: 0,
    model: "valid_model",
    status: "valid_status",
    year: 2000,
  };
};

const makeCreateVehicleRepository = (): CreateVehicleRepository => {
  class CreateVehicleRepositoryStub implements CreateVehicleRepository {
    async create(vehicleData: CreateVehicleParams): Promise<VehicleModel> {
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
  test("Should call CreateVehicleRepository with correct values", async () => {
    const { sut, createVehicleRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createVehicleRepositoryStub, "create");
    const createVehicleParams: CreateVehicleParams = makeFakeCreateVehicleParams();
    await sut.create(createVehicleParams);
    expect(createSpy).toHaveBeenCalledWith({
      brand: "valid_brand",
      chassis: "valid_chassis",
      color: "valid_color",
      cost_price: 0,
      sale_price: 0,
      km: 0,
      model: "valid_model",
      status: "valid_status",
      year: 2000,
    });
  });
  
});

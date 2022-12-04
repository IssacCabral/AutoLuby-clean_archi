import { IFindVehicleByChassisRepository } from "@data/protocols/find-vehicle-by-chassis-repository";
import { VehicleModel } from "@domain/models/vehicle";
import { CreateVehicleParams } from "@domain/types/create-vehicle-params";
import { FieldInUseError } from "@errors/field-in-use-error";
import { ICreateVehicleRepository } from "../protocols/create-vehicle-repository";
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

const makeFakeVehicle = () => {
  return {
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
};

const makeCreateVehicleRepository = (): ICreateVehicleRepository => {
  class CreateVehicleRepositoryStub implements ICreateVehicleRepository {
    async create(vehicleData: CreateVehicleParams): Promise<VehicleModel> {
      const fakeVehicle: VehicleModel = makeFakeVehicle()
      return fakeVehicle;
    }
  }
  return new CreateVehicleRepositoryStub();
};

const makeFindVehicleByChassisRepository = (): IFindVehicleByChassisRepository => { 
  class FindVehicleByChassisRepositoryStub implements IFindVehicleByChassisRepository {
    findByChassis(chassis: string): Promise<VehicleModel | null> {
      return null;
    }
  }
  return new FindVehicleByChassisRepositoryStub();
};

interface SutTypes {
  sut: DbCreateVehicle;
  createVehicleRepositoryStub: ICreateVehicleRepository;
  findVehicleByChassisRepositoryStub: IFindVehicleByChassisRepository;
}

const makeSut = (): SutTypes => {
  const createVehicleRepositoryStub = makeCreateVehicleRepository();
  const findVehicleByChassisRepositoryStub = makeFindVehicleByChassisRepository();
  const sut = new DbCreateVehicle(createVehicleRepositoryStub, findVehicleByChassisRepositoryStub);
  return {
    sut,
    createVehicleRepositoryStub,
    findVehicleByChassisRepositoryStub,
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

  test("Should throw if CreateVehicleRepository throws", async () => {
    const { sut, createVehicleRepositoryStub } = makeSut();
    jest
      .spyOn(createVehicleRepositoryStub, "create")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const createVehicleParams: CreateVehicleParams = makeFakeCreateVehicleParams();
    const promise = sut.create(createVehicleParams);
    await expect(promise).rejects.toThrow();
  });

  test("Should return FieldInUseError if chassis already exists", async () => {
    const { sut, findVehicleByChassisRepositoryStub } = makeSut();
    const fakeVehicle: VehicleModel = makeFakeVehicle()
    jest.spyOn(findVehicleByChassisRepositoryStub, "findByChassis").mockReturnValueOnce(new Promise((resolve, reject) => resolve(fakeVehicle)));
    const createVehicleParams = makeFakeCreateVehicleParams()
    const result = await sut.create(createVehicleParams)
    expect(result).toEqual(new FieldInUseError('chassis'))
  });

  test("Should return a vehicle on success", async () => {
    const { sut } = makeSut();
    const createVehicleParams: CreateVehicleParams =
      makeFakeCreateVehicleParams();
    const vehicle = (await sut.create(createVehicleParams)) as VehicleModel;
    expect(vehicle).toBeTruthy();
    expect(vehicle.id).toBeTruthy();
    expect(vehicle.brand).toBe("any_brand");
    expect(vehicle.chassis).toBe("any_chassis");
  });
});

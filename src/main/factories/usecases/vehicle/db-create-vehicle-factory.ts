import { ICreateVehicle } from "@domain/usecases/vehicle/create-vehicle";
import { DbCreateVehicle } from "@data/usecases/vehicle/db-create-vehicle";
import { CreateVehiclePrismaRepository } from "@repositories/vehicle/create-vehicle-repository/create-vehicle-prisma-repository";
import { FindVehicleByChassisPrismaRepository } from "@repositories/vehicle/find-vehicle-by-chassis-repository/find-vehicle-by-chassis-prisma-repository";

export const makeDbCreateVehicle = (): ICreateVehicle => {
  const createVehiclePrismaRepository = new CreateVehiclePrismaRepository()
  const findVehicleByChassisPrismaRepository = new FindVehicleByChassisPrismaRepository()
  return new DbCreateVehicle(createVehiclePrismaRepository, findVehicleByChassisPrismaRepository)
}
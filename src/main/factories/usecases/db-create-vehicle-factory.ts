import { ICreateVehicle } from "@domain/usecases/create-vehicle";
import { DbCreateVehicle } from "@data/usecases/db-create-vehicle";
import { CreateVehiclePrismaRepository } from "@repositories/create-vehicle-repository/create-vehicle-prisma-repository";

export const makeDbCreateVehicle = (): ICreateVehicle => {
  const createVehiclePrismaRepository = new CreateVehiclePrismaRepository()
  return new DbCreateVehicle(createVehiclePrismaRepository)
}
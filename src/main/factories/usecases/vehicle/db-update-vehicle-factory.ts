import { IUpdateVehicle } from "@domain/usecases/vehicle/update-vehicle";
import { DbUpdateVehicle } from "@data/usecases/vehicle/db-update-vehicle";
import { UpdateVehiclePrismaRepository } from "@repositories/vehicle/update-vehicle-repository/update-vehicle-prisma-repository";
import { FindVehicleByChassisPrismaRepository } from "@repositories/vehicle/find-vehicle-by-chassis-repository/find-vehicle-by-chassis-prisma-repository";

export const makeDbUpdateVehicle = (): IUpdateVehicle => {
  const updateVehiclePrismaRepository = new UpdateVehiclePrismaRepository()
  const findVehicleByChassisPrismaRepository = new FindVehicleByChassisPrismaRepository()
  return new DbUpdateVehicle(updateVehiclePrismaRepository, findVehicleByChassisPrismaRepository)
}
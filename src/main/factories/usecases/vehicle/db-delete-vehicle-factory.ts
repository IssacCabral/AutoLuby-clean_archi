import { DbDeleteVehicle } from "@data/usecases/vehicle/db-delete-vehicle";
import { IDeleteVehicle } from "@domain/usecases/vehicle/delete-vehicle";
import { DeleteVehiclePrismaRepository } from "@repositories/vehicle/delete-vehicle-repository/delete-vehicle-prisma-repository";
import { FindVehicleByChassisPrismaRepository } from "@repositories/vehicle/find-vehicle-by-chassis-repository/find-vehicle-by-chassis-prisma-repository";

export const makeDbDeleteVehicle = (): IDeleteVehicle => {
  const deleteVehiclePrismaRepository = new DeleteVehiclePrismaRepository()
  const findVehicleByChassisPrismaRepository = new FindVehicleByChassisPrismaRepository()
  return new DbDeleteVehicle(deleteVehiclePrismaRepository, findVehicleByChassisPrismaRepository)
}
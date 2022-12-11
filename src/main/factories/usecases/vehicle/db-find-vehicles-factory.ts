import { IFindVehicles } from "@domain/usecases/vehicle/find-vehicles";
import { DbFindVehicles } from "@data/usecases/vehicle/db-find-vehicles";
import { FindVehiclesPrismaRepository } from "@repositories/vehicle/find-vehicles-repository/find-vehicles-prisma-repository";

export const makeDbFindVehicles = (): IFindVehicles => {
  const findVehiclesPrismaRepository = new FindVehiclesPrismaRepository()
  return new DbFindVehicles(findVehiclesPrismaRepository)
}
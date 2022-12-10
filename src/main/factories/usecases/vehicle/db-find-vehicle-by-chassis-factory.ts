import { DbFindVehicleByChassis } from "@data/usecases/vehicle/db-find-vehicle-by-chassis";
import { IFindVehicleByChassis } from "@domain/usecases/vehicle/find-vehicle-by-chassis";
import { FindVehicleByChassisPrismaRepository } from "@repositories/vehicle/find-vehicle-by-chassis-repository/find-vehicle-by-chassis-prisma-repository";

export const makeDbFindVehicleByChassis = (): IFindVehicleByChassis => {
  const findVehicleByChassisPrismaRepository = new FindVehicleByChassisPrismaRepository()
  return new DbFindVehicleByChassis(findVehicleByChassisPrismaRepository)
}
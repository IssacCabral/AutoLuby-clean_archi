import { DbCreateSale } from "@data/usecases/sale/db-create-sale";
import { ICreateSale } from "@domain/usecases/sale/create-sale";
import { CreateSalePrismaRepository } from "@repositories/sale/create-sale-repository/create-sale-prisma-repository";
import { FindUserByIdPrismaRepository } from "@repositories/user/find-user-by-id-repository/find-user-by-id-prisma-repository";
import { FindVehicleByIdPrismaRepository } from "@repositories/vehicle/find-vehicle-by-id-repository/find-vehicle-by-id-prisma-repository";

export const makeDbCreateSale = (): ICreateSale => {
  const createSalePrismaRepository = new CreateSalePrismaRepository()
  const findUserByIdPrismaRepository = new FindUserByIdPrismaRepository()
  const findVehicleByIdPrismaRepository = new FindVehicleByIdPrismaRepository()
  return new DbCreateSale(
    createSalePrismaRepository, 
    findUserByIdPrismaRepository, 
    findVehicleByIdPrismaRepository
  )
}
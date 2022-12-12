import { IFindVehicleByIdRepository } from "@data/protocols/vehicle/find-vehicle-by-id-repository";
import { VehicleModel } from "@domain/models/vehicle";
import { prisma } from "@infra/prisma/prisma-client";

export class FindVehicleByIdPrismaRepository implements IFindVehicleByIdRepository{
  async findById(id: string): Promise<VehicleModel> {
    return prisma.vehicle.findUnique({where: {id}})
  }
}
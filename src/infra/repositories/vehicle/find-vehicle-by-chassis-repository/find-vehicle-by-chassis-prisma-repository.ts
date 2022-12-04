import { IFindVehicleByChassisRepository } from "@data/protocols/find-vehicle-by-chassis-repository";
import { VehicleModel } from "@domain/models/vehicle";
import { PrismaClient } from "@prisma/client";

export class FindVehicleByChassisPrismaRepository implements IFindVehicleByChassisRepository{
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  findByChassis(chassis: string): Promise<VehicleModel | null> {
    return this.prismaClient.vehicle.findUnique({where: {chassis}})
  }

}
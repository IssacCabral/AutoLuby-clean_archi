import { IFindVehicleByChassisRepository } from "@data/protocols/find-vehicle-by-chassis-repository";
import { VehicleModel } from "@domain/models/vehicle";
import {prisma} from '../../../prisma/prisma-client'

export class FindVehicleByChassisPrismaRepository implements IFindVehicleByChassisRepository{
  findByChassis(chassis: string): Promise<VehicleModel | null> {
    return prisma.vehicle.findUnique({where: {chassis}})
  }
}
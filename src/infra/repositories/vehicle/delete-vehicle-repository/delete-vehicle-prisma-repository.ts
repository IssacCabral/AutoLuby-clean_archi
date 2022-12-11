import { IDeleteVehicleRepository } from "@data/protocols/vehicle/delete-vehicle-repository";
import { prisma } from "@infra/prisma/prisma-client";

export class DeleteVehiclePrismaRepository implements IDeleteVehicleRepository{

  async deleteVehicle(chassis: string): Promise<boolean> {
    await prisma.vehicle.delete({where: {chassis}})
    return true
  }
}
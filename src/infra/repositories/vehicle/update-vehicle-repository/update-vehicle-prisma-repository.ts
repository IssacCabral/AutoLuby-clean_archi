import { IUpdateVehicleRepository } from "@data/protocols/vehicle/update-vehicle-repository";
import { VehicleModel } from "@domain/models/vehicle";
import { UpdateVehicleParams } from "@domain/types/update-vehicle-params";
import { prisma } from "@infra/prisma/prisma-client";

export class UpdateVehiclePrismaRepository implements IUpdateVehicleRepository{
  async updateVehicle(id: string, params: UpdateVehicleParams): Promise<VehicleModel> {
    const updateVehicle = await prisma.vehicle.update({
      where: {id},
      data: {
        ...params
      }
    })
    return updateVehicle
  }
}
import { VehicleModel } from "@domain/models/vehicle";
import { CreateVehicleParams } from "@domain/types/create-vehicle-params";
import { ICreateVehicleRepository } from "src/data/protocols/vehicle/create-vehicle-repository";
import {prisma} from '@infra/prisma/prisma-client'

export class CreateVehiclePrismaRepository implements ICreateVehicleRepository{
  async create(vehicleData: CreateVehicleParams): Promise<VehicleModel> {
    const vehicle = await prisma.vehicle.create({
      data: {
        ...vehicleData
      }
    })
    return vehicle
  }
}
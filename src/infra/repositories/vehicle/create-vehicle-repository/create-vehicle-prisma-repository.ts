import { VehicleModel } from "@domain/models/vehicle";
import { CreateVehicleParams } from "@domain/types/create-vehicle-params";
import { ICreateVehicleRepository } from "src/data/protocols/create-vehicle-repository";
import {prisma} from '../../../prisma/prisma-client'

export class CreateVehiclePrismaRepository implements ICreateVehicleRepository{
  async create(vehicleData: CreateVehicleParams): Promise<VehicleModel> {
    const vehicle = prisma.vehicle.create({
      data: {
        ...vehicleData
      }
    })
    return vehicle
  }
}
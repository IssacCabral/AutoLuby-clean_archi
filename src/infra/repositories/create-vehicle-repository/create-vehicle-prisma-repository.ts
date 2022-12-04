import { VehicleModel } from "@domain/models/vehicle";
import { CreateVehicleParams } from "@domain/types/create-vehicle-params";
import { ICreateVehicleRepository } from "src/data/protocols/create-vehicle-repository";
import { PrismaClient } from "@prisma/client";

export class CreateVehiclePrismaRepository implements ICreateVehicleRepository{
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async create(vehicleData: CreateVehicleParams): Promise<VehicleModel> {
    const vehicle = this.prismaClient.vehicle.create({
      data: {
        ...vehicleData
      }
    })
    return vehicle
  }

}
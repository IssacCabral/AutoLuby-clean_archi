import { VehicleModel } from "../../domain/models/vehicle";
import { CreateVehicleParams } from "../../domain/types/create-vehicle-params";
import { ICreateVehicle } from "../../domain/usecases/create-vehicle";
import { ICreateVehicleRepository } from "../protocols/create-vehicle-repository";

export class DbCreateVehicle implements ICreateVehicle{
  constructor(
    private readonly createVehicleRepository: ICreateVehicleRepository
  ) {}

  async create(params: CreateVehicleParams): Promise<VehicleModel | Error> {
    const vehicle = await this.createVehicleRepository.create(params)
    return vehicle
  }

}
import { VehicleModel } from "@domain/models/vehicle";
import { CreateVehicleParams } from "@domain/types/create-vehicle-params";
import { ICreateVehicle } from "@domain/usecases/vehicle/create-vehicle";
import { ICreateVehicleRepository } from "@data/protocols/vehicle/create-vehicle-repository";
import { IFindVehicleByChassisRepository } from "@data/protocols/vehicle/find-vehicle-by-chassis-repository";
import { FieldInUseError } from "@errors/field-in-use-error";

export class DbCreateVehicle implements ICreateVehicle{
  constructor(
    private readonly createVehicleRepository: ICreateVehicleRepository,
    private readonly findVehicleByChassisRepository: IFindVehicleByChassisRepository
  ) {}

  async create(params: CreateVehicleParams): Promise<VehicleModel | Error> {
    const vehicleByChassis = await this.findVehicleByChassisRepository.findByChassis(params.chassis)
    if(vehicleByChassis){
      return new FieldInUseError("chassis")
    }
    const vehicle = await this.createVehicleRepository.create(params)
    return vehicle
  }
}
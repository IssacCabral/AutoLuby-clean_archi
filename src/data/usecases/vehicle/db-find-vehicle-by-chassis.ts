import { IFindVehicleByChassisRepository } from "@data/protocols/vehicle/find-vehicle-by-chassis-repository";
import { VehicleModel } from "@domain/models/vehicle";
import { IFindVehicleByChassis } from "@domain/usecases/vehicle/find-vehicle-by-chassis";

export class DbFindVehicleByChassis implements IFindVehicleByChassis{
  constructor(
    private readonly findVehicleByChassisRepository: IFindVehicleByChassisRepository
  ) {}

  find(chassis: string): Promise<VehicleModel> {
    return this.findVehicleByChassisRepository.findByChassis(chassis)
  }
}
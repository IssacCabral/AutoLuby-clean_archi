import { IDeleteVehicleRepository } from "@data/protocols/vehicle/delete-vehicle-repository";
import { IFindVehicleByChassisRepository } from "@data/protocols/vehicle/find-vehicle-by-chassis-repository";
import { VehicleModel } from "@domain/models/vehicle";
import { IDeleteVehicle } from "@domain/usecases/vehicle/delete-vehicle";
import { NotFoundError } from "@errors/not-found-error";

export class DbDeleteVehicle implements IDeleteVehicle{
  constructor(
    private readonly deleteVehicleRepository: IDeleteVehicleRepository,
    private readonly findVehicleByChassisRepository: IFindVehicleByChassisRepository
  ) {}

  async delete(chassis: string): Promise<VehicleModel | Error> {
    const vehicle = await this.findVehicleByChassisRepository.findByChassis(chassis)
    if(!vehicle) return new NotFoundError("Vehicle")
    const deleteResult = await this.deleteVehicleRepository.deleteVehicle(chassis)
    if(deleteResult == false){
      return new Error("could not delete")
    }
    return vehicle
  }
}
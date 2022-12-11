import { IFindVehicleByChassisRepository } from "@data/protocols/vehicle/find-vehicle-by-chassis-repository";
import { IUpdateVehicleRepository } from "@data/protocols/vehicle/update-vehicle-repository";
import { VehicleModel } from "@domain/models/vehicle";
import { UpdateVehicleParams } from "@domain/types/update-vehicle-params";
import { IUpdateVehicle } from "@domain/usecases/vehicle/update-vehicle";
import { FieldInUseError } from "@errors/field-in-use-error";

export class DbUpdateVehicle implements IUpdateVehicle{
  constructor(
    private readonly updateVehicleRepository: IUpdateVehicleRepository,
    private readonly findVehicleByChassisRepository: IFindVehicleByChassisRepository
  ) {}

  async update(vehicle: VehicleModel, params: UpdateVehicleParams): Promise<VehicleModel | Error> {
    if(params.chassis){
      const vehicleByChassis = await this.findVehicleByChassisRepository.findByChassis(params.chassis)
      if(vehicleByChassis && vehicleByChassis.chassis !== vehicle.chassis){
        return new FieldInUseError('chassis')
      }     
    }
    const updatedVehicle = await this.updateVehicleRepository.updateVehicle(vehicle.id, params)
    return updatedVehicle
  }
}
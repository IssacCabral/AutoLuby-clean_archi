import { VehicleModel } from "@domain/models/vehicle";
import { UpdateVehicleParams } from "@domain/types/update-vehicle-params";

export interface IUpdateVehicle{
  update(vehicle: VehicleModel, params: UpdateVehicleParams): Promise<VehicleModel | Error>
}
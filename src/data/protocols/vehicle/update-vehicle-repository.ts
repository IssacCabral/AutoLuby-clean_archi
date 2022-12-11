import { VehicleModel } from "@domain/models/vehicle";
import { UpdateVehicleParams } from "@domain/types/update-vehicle-params";

export interface IUpdateVehicleRepository{
  updateVehicle(id: string, params: UpdateVehicleParams): Promise<VehicleModel>
}
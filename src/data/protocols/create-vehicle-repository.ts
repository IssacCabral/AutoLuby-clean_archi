import {CreateVehicleParams} from "@domain/types/create-vehicle-params"
import { VehicleModel } from "@domain/models/vehicle";

export interface ICreateVehicleRepository{
  create(vehicleData: CreateVehicleParams): Promise<VehicleModel>
}
import { VehicleModel } from "../models/vehicle";
import { CreateVehicleParams } from "../types/create-vehicle-params";

export interface ICreateVehicle{
  create(params: CreateVehicleParams): Promise<VehicleModel | Error>
}
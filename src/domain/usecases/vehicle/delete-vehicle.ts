import { VehicleModel } from "@domain/models/vehicle";

export interface IDeleteVehicle{
  delete(chassis: string): Promise<VehicleModel | Error>
}
import { VehicleModel } from "@domain/models/vehicle";

export interface IFindVehicleByChassis{
  find(chassis: string): Promise<VehicleModel | null>
}
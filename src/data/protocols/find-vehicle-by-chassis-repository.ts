import { VehicleModel } from "@domain/models/vehicle";

export interface IFindVehicleByChassisRepository{
  findByChassis(chassis: string): Promise<VehicleModel | null>
}
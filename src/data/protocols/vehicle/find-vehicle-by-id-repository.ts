import { VehicleModel } from "@domain/models/vehicle";

export interface IFindVehicleByIdRepository{
  findById(id: string): Promise<VehicleModel | null>
}
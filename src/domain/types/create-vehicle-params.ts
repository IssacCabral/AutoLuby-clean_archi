import { VehicleModel } from "../models/vehicle";

export type CreateVehicleParams = Omit<VehicleModel, 'id' | 'createdAt' | 'updatedAt'>
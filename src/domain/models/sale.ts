import { UserModel } from "./user"
import { VehicleModel } from "./vehicle"

export type SaleModel = {
  id: string
  saleDate: Date
  vehicleStatus: string
  price: number
  userId: string
  vehicleId: string
  user?: UserModel
  vehicle?: VehicleModel
}
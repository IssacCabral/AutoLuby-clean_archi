import { UserModel } from "./user"

export type SaleModel = {
  id: string
  saleDate: Date
  vehicleStatus: string
  price: number
  userId: number
  user?: UserModel
}
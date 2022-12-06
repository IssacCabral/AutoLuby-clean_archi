import { SaleModel } from "./sale"
import { ReservationModel } from "./reservation"
import { RoleModel } from "./role"

export type UserModel = {
  id: string
  email: string
  password: string
  name: string
  cpf: string
  biography: string
  wage: number
  roles?: RoleModel[]
  sales?: SaleModel[]
  reservations?: ReservationModel[]
  createdAt: Date
  updatedAt: Date
}
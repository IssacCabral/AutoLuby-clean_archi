import { UserModel } from "@domain/models/user"

export interface IFindUserByIdRepository {
  findById(id: string): Promise<UserModel | null>
}

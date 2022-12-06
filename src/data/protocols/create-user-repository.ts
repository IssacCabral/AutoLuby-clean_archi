import { UserModel } from "@domain/models/user";
import { CreateUserParams } from "@domain/types/create-user-params";

export interface ICreateUserRepository{
  create(userData: CreateUserParams): Promise<UserModel>
}
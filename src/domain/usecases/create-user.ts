import { UserModel } from "@domain/models/user";
import { CreateUserParams } from "@domain/types/create-user-params";

export interface ICreateUser{
  create(params: CreateUserParams): Promise<UserModel | Error>
}
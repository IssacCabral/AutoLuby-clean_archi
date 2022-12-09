import { ICreateUserRepository } from "@data/protocols/user/create-user-repository";
import { UserModel } from "@domain/models/user";
import { CreateUserParams } from "@domain/types/create-user-params";
import {prisma} from '../../../prisma/prisma-client'

export class CreateUserPrismaRepository implements ICreateUserRepository{
  async create(userData: CreateUserParams): Promise<UserModel> {
    const createUserResult = await prisma.user.create({
      data: {
        ...userData,
        roles: {
          connect: {
            id: 2
          }
        }
      }
    })
    const createdUser = await prisma.user.findUnique({
      where: {
        id: createUserResult.id
      },
      include: {
        roles: true
      }
    })
    const userWithoutPass = Object.assign({}, createdUser, {password: undefined}) 
    return userWithoutPass
  }
}
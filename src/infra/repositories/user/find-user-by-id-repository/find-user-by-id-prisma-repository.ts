import { IFindUserByIdRepository } from "@data/protocols/user/find-user-by-id-repository";
import { UserModel } from "@domain/models/user";
import { prisma } from "@infra/prisma/prisma-client";

export class FindUserByIdPrismaRepository implements IFindUserByIdRepository{
  findById(id: string): Promise<UserModel> {
    return prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}
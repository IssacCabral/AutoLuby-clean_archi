import { IFindUserByEmailRepository } from "@data/protocols/user/find-user-by-email-repository";
import { UserModel } from "@domain/models/user";
import {prisma} from '@infra/prisma/prisma-client'

export class FindUserByEmailPrismaRepository implements IFindUserByEmailRepository{
  async findByEmail(email: string): Promise<UserModel> {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        roles: true
      }
    })
    return user
  }
}
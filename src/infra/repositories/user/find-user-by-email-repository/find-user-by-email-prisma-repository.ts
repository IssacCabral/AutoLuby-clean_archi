import { IFindUserByEmailRepository } from "@data/protocols/find-user-by-email-repository";
import { UserModel } from "@domain/models/user";
import {prisma} from '../../../prisma/prisma-client'

export class FindUserByEmailPrismaRepository implements IFindUserByEmailRepository{
  async findByEmail(email: string): Promise<UserModel> {
    return await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        roles: true
      }
    })
  }
}
import { IFindUserByCpfRepository } from "@data/protocols/user/find-user-by-cpf-repository";
import { UserModel } from "@domain/models/user";
import {prisma} from '../../../prisma/prisma-client'

export class FindUserByCpfPrismaRepository implements IFindUserByCpfRepository{
  async findByCpf(cpf: string): Promise<UserModel> {
    return await prisma.user.findUnique({
      where: {
        cpf
      },
      include: {
        roles: true
      }
    })
  }
}
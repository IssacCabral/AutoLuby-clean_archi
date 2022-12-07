import { IFindUserByCpfRepository } from "@data/protocols/find-user-by-cpf-repository";
import { UserModel } from "@domain/models/user";
import {prisma} from '../../../prisma/prisma-client'

export class FindUserByCpfPrismaRepository implements IFindUserByCpfRepository{
  async findByCpf(cpf: string): Promise<UserModel> {
    const user = await prisma.user.findUnique({
      where: {
        cpf
      },
      include: {
        roles: true
      }
    })
    const userWithoutPass = Object.assign({}, user, {password: undefined})
    return userWithoutPass
  }
}
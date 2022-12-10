import { ICreateUser } from "@domain/usecases/user/create-user"
import { CreateUserPrismaRepository } from "@repositories/user/create-user-repository/create-user-prisma-repository"
import { FindUserByCpfPrismaRepository } from "@repositories/user/find-user-by-cpf-repository/find-user-by-cpf-prisma-repository"
import { FindUserByEmailPrismaRepository } from "@repositories/user/find-user-by-email-repository/find-user-by-email-prisma-repository"
import { DbCreateUser } from "@data/usecases/user/db-create-user"
import { BcryptAdapter } from "@cryptography/bcrypt-adapter/bcrypt-adapter"

export const makeDbCreateUser = (): ICreateUser => {
  const createUserPrismaRepository = new CreateUserPrismaRepository()
  const findUserByCpfPrismaRepository = new FindUserByCpfPrismaRepository()
  const findUserByEmailPrismaRepository = new FindUserByEmailPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(12) 
  return new DbCreateUser(createUserPrismaRepository, findUserByCpfPrismaRepository, findUserByEmailPrismaRepository, bcryptAdapter)
}
import { IAuthentication } from "@domain/usecases/authentication/authentication";
import { DbAuthentication } from "@data/usecases/authentication/db-authentication";
import { FindUserByEmailPrismaRepository } from "@repositories/user/find-user-by-email-repository/find-user-by-email-prisma-repository";
import { BcryptAdapter } from "@cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@cryptography/jwt-adapter/jwt-adapter";
import env from "@infra/config/env";

export const makeDbLogin = (): IAuthentication => {
  const findUserByEmailPrismaRepository = new FindUserByEmailPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.SECRET)
  return new DbAuthentication(findUserByEmailPrismaRepository, bcryptAdapter, jwtAdapter)
}
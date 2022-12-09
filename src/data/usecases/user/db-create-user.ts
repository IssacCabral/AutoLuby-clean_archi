import { ICreateUserRepository } from "@data/protocols/user/create-user-repository";
import { IHasher } from "@data/protocols/cryptography/hasher";
import { IFindUserByCpfRepository } from "@data/protocols/user/find-user-by-cpf-repository";
import { IFindUserByEmailRepository } from "@data/protocols/user/find-user-by-email-repository";
import { UserModel } from "@domain/models/user";
import { CreateUserParams } from "@domain/types/create-user-params";
import { ICreateUser } from "@domain/usecases/user/create-user";
import { FieldInUseError } from "@errors/field-in-use-error";

export class DbCreateUser implements ICreateUser{
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly findUserByCpfRepository: IFindUserByCpfRepository,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly hasher: IHasher
  ) {}

  async create(params: CreateUserParams): Promise<Error | UserModel> {
    const userByCpf = await this.findUserByCpfRepository.findByCpf(params.cpf)

    if(userByCpf){
      return new FieldInUseError("cpf")
    }

    const userByEmail = await this.findUserByEmailRepository.findByEmail(params.email)
    if(userByEmail){
      return new FieldInUseError("email")
    }

    const hashedPassword = await this.hasher.hash(params.password)
    const user = await this.createUserRepository.create(Object.assign({}, params, {password: hashedPassword}))
    return user
  }
}
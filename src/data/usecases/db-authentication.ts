import { IFindUserByEmailRepository } from "@data/protocols/find-user-by-email-repository";
import { IHashComparer } from "@data/protocols/hash-comparer";
import { IAuthentication } from "@domain/usecases/authentication";
import { InvalidCredentialsError } from "@errors/invalid-credentials-error";

export class DbAuthentication implements IAuthentication{
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly hashComparer: IHashComparer
  ) {}

  async auth(email: string, password: string): Promise<string | Error> {
    const user = await this.findUserByEmailRepository.findByEmail(email)
    if(!user){
      return new InvalidCredentialsError()
    }

    const hashComparerResult = await this.hashComparer.compare(password, user.password)
    if(hashComparerResult == false){
      return new InvalidCredentialsError()
    }

    return 'hash'
  }
}
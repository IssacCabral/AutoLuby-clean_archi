import { IFindUserByEmailRepository } from "@data/protocols/find-user-by-email-repository";
import { IHashComparer } from "@data/protocols/hash-comparer";
import { IAuthentication } from "@domain/usecases/authentication";

export class DbAuthentication implements IAuthentication{
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly hashComparer: IHashComparer
  ) {}

  async auth(email: string, password: string): Promise<string> {
    const user = await this.findUserByEmailRepository.findByEmail(email)
    if(!user){
      return null
    }

    const hashComparerResult = await this.hashComparer.compare(password, user.password)
    if(hashComparerResult == false){
      return null
    }

    return 'hash'
  }
}
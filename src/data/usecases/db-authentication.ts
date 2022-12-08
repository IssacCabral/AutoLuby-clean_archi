import { IFindUserByEmailRepository } from "@data/protocols/find-user-by-email-repository";
import { IAuthentication } from "@domain/usecases/authentication";

export class DbAuthentication implements IAuthentication{
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
  ) {}

  async auth(email: string, password: string): Promise<string> {
    const userByEmail = await this.findUserByEmailRepository.findByEmail(email)

    if(!userByEmail){
      return "erro"
    }
    return null
  }
}
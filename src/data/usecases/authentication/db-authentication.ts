import { IFindUserByEmailRepository } from "@data/protocols/user/find-user-by-email-repository";
import { IHashComparer } from "@data/protocols/cryptography/hash-comparer";
import { ITokenGenerator } from "@data/protocols/cryptography/token-generator";
import { IUpdateAccessTokenRepository } from "@data/protocols/user/update-access-token-repository";
import { IAuthentication } from "@domain/usecases/authentication/authentication";
import { InvalidCredentialsError } from "@errors/invalid-credentials-error";

export class DbAuthentication implements IAuthentication{
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
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
    
    const accessToken = await this.tokenGenerator.generate(user.id)
    await this.updateAccessTokenRepository.update(user.id, accessToken)

    return accessToken
  }
}
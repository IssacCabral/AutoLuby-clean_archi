import { ITokenGenerator } from '@data/protocols/cryptography/token-generator';
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator{
  constructor(
    private readonly secret: string
  ) {}

  async generate(value: string): Promise<string> {
    const accessToken = jwt.sign({id: value}, this.secret)
    return accessToken
  }

}
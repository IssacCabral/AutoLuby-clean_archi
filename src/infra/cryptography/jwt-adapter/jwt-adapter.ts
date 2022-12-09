import { ITokenGenerator } from '@data/protocols/cryptography/token-generator';
import { ITokenVerifier } from '@data/protocols/cryptography/token-verifier';
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator, ITokenVerifier{
  constructor(
    private readonly secret: string
  ) {}

  async generate(value: string): Promise<string> {
    const accessToken = jwt.sign({id: value}, this.secret)
    return accessToken
  }

  async verify(ciphertext: string): Promise<any> {
    return jwt.verify(ciphertext, this.secret)
  }
}
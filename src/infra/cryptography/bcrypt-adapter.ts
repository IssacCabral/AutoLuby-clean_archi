import { IEncrypter } from "@data/protocols/cryptography/encrypter";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypter{
  constructor(
    private readonly salt: number
  ) {}

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
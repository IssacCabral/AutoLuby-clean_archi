import { IHashComparer } from "@data/protocols/cryptography/hash-comparer";
import { IHasher } from "@data/protocols/cryptography/hasher";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashComparer{
  constructor(
    private readonly salt: number
  ) {}
  
  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
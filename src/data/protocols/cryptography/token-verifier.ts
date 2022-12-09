export interface ITokenVerifier{
  verify(ciphertext: string): Promise<any>
}
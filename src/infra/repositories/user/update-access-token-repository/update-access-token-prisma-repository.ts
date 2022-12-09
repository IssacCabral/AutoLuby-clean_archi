import { IUpdateAccessTokenRepository } from "@data/protocols/user/update-access-token-repository";
import { prisma } from "@infra/prisma/prisma-client";

export class UpdateAccessTokenPrismaRepository implements IUpdateAccessTokenRepository{
  update(id: string, token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
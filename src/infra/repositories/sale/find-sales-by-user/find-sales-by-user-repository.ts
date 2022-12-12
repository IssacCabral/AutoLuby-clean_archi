import { prisma } from "@infra/prisma/prisma-client";

export class FindSalesByUserRepository{
  async find(id: string, page = 1, limit = 1){
    const user = await prisma.user.findUnique({where: {id}})
    const userSales = await prisma.sale.findMany({
      where: {
        userId: id
      },
      take: page,
      skip: (page - 1) * limit
    })

    return {
      user: user,
      sales: userSales
    }
  }
}
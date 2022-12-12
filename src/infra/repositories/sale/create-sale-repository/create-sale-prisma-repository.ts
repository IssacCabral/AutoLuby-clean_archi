import { ICreateSaleRepository } from "@data/protocols/sale/create-sale-repository";
import { SaleModel } from "@domain/models/sale";
import { CreateSaleParams } from "@domain/types/create-sale-params";
import { prisma } from "@infra/prisma/prisma-client";

export class CreateSalePrismaRepository implements ICreateSaleRepository{
  async create(saleData: CreateSaleParams): Promise<SaleModel> {
    const vehicle = await prisma.vehicle.update({
      where: {
        id: saleData.vehicleId
      },
      data: {
        status: "sold"
      }
    })

    const sale = await prisma.sale.create({
      data: {
        price: vehicle.sale_price,
        userId: saleData.userId,
        vehicleId: saleData.vehicleId,
        vehicleStatus: vehicle.status
      }
    })
    return sale
  }
}
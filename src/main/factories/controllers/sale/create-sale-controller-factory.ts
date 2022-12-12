import { CreateSaleController } from "@controllers/sale-controllers/create-sale-controller";
import { makeDbCreateSale } from "@factories/usecases/sale/db-create-sale-factory";

export const makeCreateSaleController = (): CreateSaleController => {
  return new CreateSaleController(makeDbCreateSale())
}
import { SaleModel } from "@domain/models/sale";
import { CreateSaleParams } from "@domain/types/create-sale-params";

export interface ICreateSale{
  create(params: CreateSaleParams): Promise<SaleModel | Error>
}
import {CreateSaleParams} from "@domain/types/create-sale-params"
import { SaleModel } from "@domain/models/sale"

export interface ICreateSaleRepository{
  create(saleData: CreateSaleParams): Promise<SaleModel>
}
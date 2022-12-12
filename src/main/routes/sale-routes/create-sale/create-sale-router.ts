import { Router } from "express";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeCreateSaleController } from "@factories/controllers/sale/create-sale-controller-factory";

const createSaleRouter = Router()

createSaleRouter.post('/sales', ExpressAdapter.adapt(makeCreateSaleController()))

export default createSaleRouter
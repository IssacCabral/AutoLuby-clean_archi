import { Router } from "express";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeFindVehiclesController } from "@factories/controllers/vehicle/find-vehicles-factory";

const findVehiclesRouter = Router()

findVehiclesRouter.get('/vehicles/', ExpressAdapter.adapt(makeFindVehiclesController()))

export default findVehiclesRouter
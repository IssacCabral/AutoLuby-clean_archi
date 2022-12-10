import { Router } from "express";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeFindVehicleByChassisController } from "@factories/controllers/vehicle/find-vehicle-by-chassis-controller-factory";

const findVehicleByChassisRouter = Router()

findVehicleByChassisRouter.get('/vehicles/:chassis', ExpressAdapter.adapt(makeFindVehicleByChassisController()))

export default findVehicleByChassisRouter
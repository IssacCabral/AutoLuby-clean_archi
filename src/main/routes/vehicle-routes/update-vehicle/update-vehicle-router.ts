import { Router } from "express";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeUpdateVehicleController } from "@factories/controllers/vehicle/update-vehicle-controller-factory";

const updateVehicleRouter = Router()

updateVehicleRouter.patch('/vehicles/:chassis', ExpressAdapter.adapt(makeUpdateVehicleController()))

export default updateVehicleRouter
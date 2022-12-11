import { Router } from "express";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeDeleteVehicleController } from "@factories/controllers/vehicle/delete-vehicle-controller-factory";

const deleteVehicleRouter = Router()

deleteVehicleRouter.delete('/vehicles/:chassis', ExpressAdapter.adapt(makeDeleteVehicleController()))

export default deleteVehicleRouter
import { Router } from "express";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeCreateVehicleController } from "@factories/controllers/vehicle/create-vehicle-controller-factory";

const createVehicleRoutes = Router()

createVehicleRoutes.post('/vehicles', ExpressAdapter.adapt(makeCreateVehicleController()))

export default createVehicleRoutes
import { Router } from "express";
import createVehicleRoutes from "./create-vehicle/create-vehicle-routes";

const mainRouter = Router()

export default mainRouter
                .use(createVehicleRoutes)
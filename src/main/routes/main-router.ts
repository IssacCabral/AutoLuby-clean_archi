import { Router } from "express";
import createVehicleRoutes from "./create-vehicle/create-vehicle-router";

const mainRouter = Router()

export default mainRouter
                .use(createVehicleRoutes)
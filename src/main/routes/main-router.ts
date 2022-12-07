import { Router } from "express";
import createVehicleRoutes from "./create-vehicle/create-vehicle-router";
import createUserRoutes from "./create-user/create-user-router";

const mainRouter = Router()

export default mainRouter
                .use(createVehicleRoutes)
                .use(createUserRoutes)
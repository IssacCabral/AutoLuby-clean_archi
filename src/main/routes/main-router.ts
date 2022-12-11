import { Router } from "express";
import createVehicleRoutes from "./vehicle-routes/create-vehicle/create-vehicle-router";
import createUserRoutes from "./user-routes/create-user/create-user-router";
import loginRouter from "./login-routes/login-router";
import findVehicleByChassisRouter from "./vehicle-routes/find-vehicle-by-chassis/find-vehicle-by-chassis-router";
import findVehiclesRouter from "./vehicle-routes/find-vehicles/find-vehicles-router";

const mainRouter = Router()

export default mainRouter
                .use(createVehicleRoutes)
                .use(createUserRoutes)
                .use(loginRouter)
                .use(findVehicleByChassisRouter)
                .use(findVehiclesRouter)
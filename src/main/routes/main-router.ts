import { Router } from "express";
import createVehicleRoutes from "./vehicle-routes/create-vehicle/create-vehicle-router";
import createUserRoutes from "./user-routes/create-user/create-user-router";
import loginRouter from "./login-routes/login-router";

const mainRouter = Router()

export default mainRouter
                .use(createVehicleRoutes)
                .use(createUserRoutes)
                .use(loginRouter)
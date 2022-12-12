import { Router } from "express";
import createVehicleRoutes from "./vehicle-routes/create-vehicle/create-vehicle-router";
import createUserRoutes from "./user-routes/create-user/create-user-router";
import loginRouter from "./login-routes/login-router";
import findVehicleByChassisRouter from "./vehicle-routes/find-vehicle-by-chassis/find-vehicle-by-chassis-router";
import findVehiclesRouter from "./vehicle-routes/find-vehicles/find-vehicles-router";
import updateVehicleRouter from "./vehicle-routes/update-vehicle/update-vehicle-router";
import deleteVehicleRouter from "./vehicle-routes/delete-vehicle/delete-vehicle-router";
import createSaleRouter from "./sale-routes/create-sale/create-sale-router";
import findSalesByUserRouter from "./sale-routes/find-sales-by-user/find-sales-by-user-router";

const mainRouter = Router()

export default mainRouter
                .use(createVehicleRoutes)
                .use(createUserRoutes)
                .use(loginRouter)
                .use(findVehicleByChassisRouter)
                .use(findVehiclesRouter)
                .use(updateVehicleRouter)
                .use(deleteVehicleRouter)
                .use(createSaleRouter)
                .use(findSalesByUserRouter)
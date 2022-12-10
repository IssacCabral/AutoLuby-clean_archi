import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeLoginController } from "@factories/controllers/login/create-login-controller-factory";

const loginRouter = Router()

loginRouter.post('/login', ExpressAdapter.adapt(makeLoginController()))

export default loginRouter
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ExpressAdapter } from "@main/adapters/express-routes-adapter";
import { makeCreateUserController } from "@factories/controllers/create-user/create-user-controller-factory";

const createUserRoutes = Router()

const prisma = new PrismaClient()

createUserRoutes.post('/users', ExpressAdapter.adapt(makeCreateUserController()))

createUserRoutes.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      roles: true
    }
  })
  return res.json(users)
})

export default createUserRoutes
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ExpressAdapter } from "src/main/adapters/express-routes-adapter";
import { makeCreateVehicleController } from "@factories/controllers/create-vehicle/create-vehicle-controller-factory";

const createVehicleRoutes = Router()

const prisma = new PrismaClient()

createVehicleRoutes.post('/vehicles', ExpressAdapter.adapt(makeCreateVehicleController()))

createVehicleRoutes.get('/vehicles', async (req, res) => {
  const vehicles = await prisma.vehicle.findMany()
  return res.json(vehicles)
})

export default createVehicleRoutes
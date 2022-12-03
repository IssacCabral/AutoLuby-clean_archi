import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const createVehicleRoutes = Router()

const prisma = new PrismaClient()

createVehicleRoutes.post('/vehicles', async (req, res) => {
  const {brand, model, status, year, km, color, chassis, cost_price, sale_price} = req.body
  const vehicle = await prisma.vehicle.create({
    data: {
      ...req.body
    }
  })
  return res.json(vehicle)
})

createVehicleRoutes.get('/vehicles', async (req, res) => {
  const vehicles = await prisma.vehicle.findMany()
  return res.json(vehicles)
})

export default createVehicleRoutes
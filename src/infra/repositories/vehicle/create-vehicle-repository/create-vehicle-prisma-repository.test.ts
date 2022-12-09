import {prisma} from '@infra/prisma/prisma-client'
import { CreateVehiclePrismaRepository } from './create-vehicle-prisma-repository'

const makeCreateVehicleData = () => {
  return {
    model: "Corsa",
    brand: "Wolks",
    status: "available",
    year: 2017,
    km: 18000,
    color: "blue",
    chassis: "2jH 4AAa2f zk t00129",
    sale_price: 80000,
    cost_price: 40000
  }
}

const makeSut = (): CreateVehiclePrismaRepository => {
  return new CreateVehiclePrismaRepository()
}

describe('CreateVehicle Prisma Repository', () => {
  beforeEach(async () => {
    await prisma.vehicle.deleteMany()
  })

  test('Should return an vehicle on succes', async () => {
    const sut = makeSut()
    const vehicleData = makeCreateVehicleData()
    const result = await sut.create(vehicleData)
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.model).toBe("Corsa")
  })
})
import {prisma} from '@infra/prisma/prisma-client'
import { FindVehicleByChassisPrismaRepository } from './find-vehicle-by-chassis-prisma-repository'

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

const makeSut = (): FindVehicleByChassisPrismaRepository => {
  return new FindVehicleByChassisPrismaRepository()
}

describe('FindVehicleByChassis Prisma Repository', () => {
  beforeEach(async () => {
    await prisma.vehicle.deleteMany()
  })

  afterEach(async () => {
    await prisma.vehicle.deleteMany()
  })

  test('Should return a vehicle on succes', async () => {
    const sut = makeSut()
    const vehicleData = makeCreateVehicleData()
    await prisma.vehicle.create({
      data: {
        ...vehicleData
      }
    })
    const result = await sut.findByChassis("2jH 4AAa2f zk t00129")
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.chassis).toBe("2jH 4AAa2f zk t00129")
  })

  test('Should return null if findByChassis fails', async () => {
    const sut = makeSut()
    const vehicle = await sut.findByChassis("2jH 4AAa2f zk t00129")
    expect(vehicle).toBeFalsy()
  })
})
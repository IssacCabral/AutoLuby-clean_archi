import request from 'supertest'
import app from '../../config/app'
import {prisma} from '../../../infra/prisma/prisma-client'

describe('CreateVehicle route', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.vehicle.deleteMany()
  })

  test('Should return a vehicle on success', async () => {
    await request(app)
      .post('/vehicles')
      .send({
        brand: "valid_brand",
        chassis: "valid_chassis",
        color: "valid_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "Onyx",
        status: "available",
        year: 2010,
      })
      .expect(201).then()
  })
  // test('should 1 + 1 to be 2', () => {
  //   expect(1+1).toBe(2)
  // })
})
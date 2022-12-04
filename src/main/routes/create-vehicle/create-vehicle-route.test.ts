import request from 'supertest'
import app from '../../config/app'

describe('CreateVehicle route', () => {
  test('Should return a vehicle on success', async () => {
    await request(app)
      .post('vehicles')
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
      .expect(200)
  })
})
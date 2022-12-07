import request from 'supertest'
import app from '../../config/app'
import {prisma} from '../../../infra/prisma/prisma-client'
import assert from 'assert'

describe('CreateVehicle route', () => {
  // beforeAll(async () => {
  //   await prisma.$connect()
  // })

  // afterAll(async () => {
  //   await prisma.$disconnect()
  // })

  beforeEach(async () => {
    await prisma.vehicle.deleteMany()
  })

  test('Should return a vehicle on success', async () => {
    await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        cost_price: 175600,
        sale_price: 200000,
        km: 80,
        model: "Corolla",
        status: "available",
        year: 2010,
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('id'))
      })
  })

  test('Should return 400 if no brand is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        cost_price: 175600,
        sale_price: 200000,
        km: 80,
        model: "Corolla",
        status: "available",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: brand"
    })
  })

  test('Should return 400 if no chassis is provided', async () => {
    await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        color: "white",
        cost_price: 175600,
        sale_price: 200000,
        km: 80,
        model: "Corolla",
        status: "available",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
  })

  test('Should return 400 if no color is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        cost_price: 175600,
        sale_price: 200000,
        km: 80,
        model: "Corolla",
        status: "available",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    
    expect(result.body).toMatchObject({
      error: "Missing param: color"
    })
  })

  test('Should return 400 if no cost_price is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        sale_price: 200000,
        km: 80,
        model: "Corolla",
        status: "available",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: cost_price"
    })
  })

  test('Should return 400 if no sale_price is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        cost_price: 175600,
        km: 80,
        model: "Corolla",
        status: "available",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: sale_price"
    })
  })

  test('Should return 400 if no km is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        cost_price: 175600,
        sale_price: 200000,
        model: "Corolla",
        status: "available",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: km"
    })
  })

  test('Should return 400 if no model is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        cost_price: 175600,
        sale_price: 200000,
        km: 80,
        status: "available",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: model"
    })
  })

  test('Should return 400 if no status is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        cost_price: 175600,
        sale_price: 200000,
        km: 80,
        model: "Corolla",
        year: 2010,
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: status"
    })
  })

  test('Should return 400 if no year is provided', async () => {
    const result = await request(app)
      .post('/vehicles')
      .send({
        brand: "Toyota",
        chassis: "8kK R41AKj mY 5u7312",
        color: "white",
        cost_price: 175600,
        sale_price: 200000,
        km: 80,
        model: "Corolla",
        status: "available",
      })
      .expect(400)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: year"
    })
  })
})
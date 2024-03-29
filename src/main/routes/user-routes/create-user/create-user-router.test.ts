import request from 'supertest'
import app from '@main/config/app'
import {prisma} from '@infra/prisma/prisma-client'
import assert from 'assert'

describe('CreateUser route', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  
  afterAll(async () => {
    await prisma.$disconnect()
  })
  
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  test('Should return an user on success', async () => {
    await request(app)
      .post('/users')
      .send({
        email: "vitoria@gmail.com",
        password: "Abc@12345",
        name: "Ana Vitória",
        cpf: "065.553.313-35",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('id'))
      })
  })

  test('Should return 400 if no email is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        password: "Abc@12345",
        name: "Ana Vitória",
        cpf: "065.553.313-35",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: email"
    })
  })

  test('Should return 400 if no password is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "vitoria@gmail.com",
        name: "Ana Vitória",
        cpf: "065.553.313-35",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: password"
    })
  })

  test('Should return 400 if no name is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "vitoria@gmail.com",
        password: "Abc@12345",
        cpf: "065.553.313-35",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: name"
    })
  })

  test('Should return 400 if no cpf is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "vitoria@gmail.com",
        password: "Abc@12345",
        name: "Ana Vitória",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: cpf"
    })
  })

  test('Should return 400 if no biography is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "vitoria@gmail.com",
        password: "Abc@12345",
        name: "Ana Vitória",
        cpf: "065.553.313-35",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: biography"
    })
  })

  test('Should return 400 if no wage is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "vitoria@gmail.com",
        password: "Abc@12345",
        name: "Ana Vitória",
        cpf: "065.553.313-35",
        biography: "MInha biografia"
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Missing param: wage"
    })
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "invalidmail.com",
        password: "Abc@12345",
        name: "Ana Vitória",
        cpf: "065.553.313-35",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Invalid param: email"
    })
  })

  test('Should return 400 if a very weak password is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "valid@gmail.com",
        password: "123",
        name: "Ana Vitória",
        cpf: "065.553.313-35",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Invalid param: password"
    })
  })

  test('Should return 400 if an invalid cpf is provided', async () => {
    const result = await request(app)
      .post('/users')
      .send({
        email: "valid@gmail.com",
        password: "Abc@123456",
        name: "Ana Vitória",
        cpf: "065-553-313_35",
        biography: "MInha biografia",
        wage: 1000
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('error'))
      })
    expect(result.body).toMatchObject({
      error: "Invalid param: cpf"
    })
  })

})
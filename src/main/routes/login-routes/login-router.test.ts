import request from 'supertest'
import app from '@main/config/app'
import {prisma} from '@infra/prisma/prisma-client'
import assert from 'assert'
import bcrypt from 'bcrypt'

const makeCreateUserParams = () => {
  return {
    email: "felipe@gmail.com",
    password: "Abc@12345",
    name: "Felipe",
    cpf: "000.000.000-00",
    biography: "MInha biografia",
    wage: 2579
  }
}

describe('Login route', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
  })
  
  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
  })
 
  test('Should return 200 on login', async () => {
    const userData = makeCreateUserParams()
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.create({data: {...userData, password: hashedPassword}})
    await request(app)
      .post('/login')
      .send({
        email: "felipe@gmail.com",
        password: "Abc@12345",
      })
      .expect(200)
      .expect((res) => {
        if(!res.body.hasOwnProperty('accessTokenResult')) throw new Error('Expected accessTokenResult')
      })
  })

  test('Should return 400 if invalid email is provided', async () => {
    const userData = makeCreateUserParams()
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.create({data: {...userData, password: hashedPassword}})
    await request(app)
      .post('/login')
      .send({
        email: "invalidmail.com",
        password: "Abc@12345",
      })
      .expect(400)
      .expect((res) => {
        if(!res.body.hasOwnProperty('error')) throw new Error('Expected error')
      })
  })

  test('Should return 401 if invalid credentials is provided', async () => {
    const userData = makeCreateUserParams()
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.create({data: {...userData, password: hashedPassword}})
    await request(app)
      .post('/login')
      .send({
        email: "felipe@gmail.com",
        password: "wrong_password",
      })
      .expect(401)
      .expect((res) => {
        console.log(res.body)
        if(!res.body.hasOwnProperty('error')) throw new Error('Expected error')
      })
  })
})
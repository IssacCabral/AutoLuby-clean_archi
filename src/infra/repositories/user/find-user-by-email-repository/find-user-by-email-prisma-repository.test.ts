import {prisma} from '@infra/prisma/prisma-client'
import { FindUserByEmailPrismaRepository } from './find-user-by-email-prisma-repository'

const makeCreateUserData = () => {
  return {
    email: "issac@email.com",
    password: "Abc@12345",
    name: "Issac",
    cpf: "065.553.313-30",
    biography: "My biography",
    wage: 1000
  }
}

const makeSut = (): FindUserByEmailPrismaRepository => {
  return new FindUserByEmailPrismaRepository()
}

describe('FindUserByEmail Prisma Repository', () => {
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

  test('Should return an user on succes', async () => {
    const sut = makeSut()
    const userData = makeCreateUserData()
    await prisma.user.create({
      data: {
        ...userData
      }
    })
    const result = await sut.findByEmail("issac@email.com")
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.email).toBe("issac@email.com")
  })

  test('Should return null if findByEmail fails', async () => {
    const sut = makeSut()
    const user = await sut.findByEmail('fake_email@email.com')
    expect(user).toBeFalsy()
  })
})
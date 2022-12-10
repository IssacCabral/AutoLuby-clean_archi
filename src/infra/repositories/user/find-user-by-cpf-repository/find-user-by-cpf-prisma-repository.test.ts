import {prisma} from '@infra/prisma/prisma-client'
import { FindUserByCpfPrismaRepository } from './find-user-by-cpf-prisma-repository'

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

const makeSut = (): FindUserByCpfPrismaRepository => {
  return new FindUserByCpfPrismaRepository()
}

describe('FindUserByCpf Prisma Repository', () => {
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
    const result = await sut.findByCpf("065.553.313-30")
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.cpf).toBe("065.553.313-30")
  })

  test('Should return null if findByCpf fails', async () => {
    const sut = makeSut()
    const user = await sut.findByCpf("065.553.313-30")
    expect(user).toBeFalsy()
  })
})
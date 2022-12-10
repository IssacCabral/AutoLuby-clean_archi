import {prisma} from '@infra/prisma/prisma-client'
import {CreateUserPrismaRepository} from './create-user-prisma-repository'

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

const makeSut = (): CreateUserPrismaRepository => {
  return new CreateUserPrismaRepository()
}

describe('CreateUser Prisma Repository', () => {
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
    const result = await sut.create(userData)
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.name).toBe("Issac")
  })

  test('Should automatically create a user with employee permissions', async () => {
    const sut = makeSut()
    const userData = makeCreateUserData()
    const user = await sut.create(userData)
    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.roles[0].type).toBe("Employee")
  })

  test('Should omit password when returning created user', async () => {
    const sut = makeSut()
    const userData = makeCreateUserData()
    const user = await sut.create(userData)
    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.password).toBeUndefined
  })
})
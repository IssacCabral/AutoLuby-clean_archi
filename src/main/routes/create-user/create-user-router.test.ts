import request from 'supertest'
import app from '../../config/app'
import {prisma} from '../../../infra/prisma/prisma-client'
import assert from 'assert'

describe('CreateUser route', () => {
  beforeEach(async () => {
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
      .expect((res) => {
        assert(res.body.hasOwnProperty('id'))
      })
      .end((err, res) => {
        if(err) throw err
        console.log(res.body)
      })
  })
})
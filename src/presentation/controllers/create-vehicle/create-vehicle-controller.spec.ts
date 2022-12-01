import { VehicleModel } from '@domain/models/vehicle'
import { CreateVehicleParams } from '@domain/types/create-vehicle-params'
import { ICreateVehicle } from '@domain/usecases/create-vehicle'
import { MissingParamError } from '@errors/missing-param-error'
import {CreateVehicleController} from './create-vehicle-controller'

const makeCreateVehicle = (): ICreateVehicle => {
  class CreateVehicleStub implements ICreateVehicle{
    async create(params: CreateVehicleParams): Promise<Error | VehicleModel> {
      const fakeVehicle: VehicleModel = {
        id: "any_id",
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
        createdAt: new Date(2022, 9, 1),
        updatedAt: new Date(2022, 9, 1),
      };
      return fakeVehicle;
    }
  }
  return new CreateVehicleStub()
}

interface SutTypes{
  sut: CreateVehicleController
  createVehicleStub: ICreateVehicle
}

const makeSut = (): SutTypes => {
  const createVehicleStub = makeCreateVehicle()
  const sut = new CreateVehicleController(createVehicleStub)
  return {
    sut,
    createVehicleStub
  }
}

describe('CreateVehicle Controller', () => {
  test('Should return 400 if no model is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        status: "any_status",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('model'))
  })

  test('Should return 400 if no brand is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('brand'))
  })

  test('Should return 400 if no status is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "any_model",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('status'))
  })

  test('Should return 400 if no year is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status"
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('year'))
  })

  test('Should return 400 if no km is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('km'))
  })

  test('Should return 400 if no color is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        chassis: "any_chassis",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('color'))
  })

  test('Should return 400 if no chassis is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        color: "any_color",
        cost_price: 0,
        sale_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('chassis'))
  })

  test('Should return 400 if no sale_price is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        cost_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('sale_price'))
  })

  test('Should return 400 if no cost_price is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        brand: "any_brand",
        chassis: "any_chassis",
        color: "any_color",
        sale_price: 0,
        km: 0,
        model: "any_model",
        status: "any_status",
        year: 2000,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cost_price'))
  })

})
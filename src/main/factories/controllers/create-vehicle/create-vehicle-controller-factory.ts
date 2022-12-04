import { CreateVehicleController } from "@controllers/create-vehicle/create-vehicle-controller"
import { makeDbCreateVehicle } from "@factories/usecases/db-create-vehicle-factory"
import {makeCreateVehicleValidation} from './create-vehicle-validation-factory'

export const makeCreateVehicleController = (): CreateVehicleController => {
  const controller = new CreateVehicleController(makeDbCreateVehicle(), makeCreateVehicleValidation())
  return controller
}
import { CreateVehicleController } from "@controllers/vehicle-controllers/create-vehicle/create-vehicle-controller"
import { makeDbCreateVehicle } from "@factories/usecases/vehicle/db-create-vehicle-factory"
import {makeCreateVehicleValidation} from './create-vehicle-validation-factory'

export const makeCreateVehicleController = (): CreateVehicleController => {
  const controller = new CreateVehicleController(makeDbCreateVehicle(), makeCreateVehicleValidation())
  return controller
}
import { CreateVehicleController } from "@controllers/create-vehicle/create-vehicle-controller"
import { makeDbCreateVehicle } from "@factories/usecases/db-create-vehicle-factory"

export const makeCreateVehicleController = (): CreateVehicleController => {
  const controller = new CreateVehicleController(makeDbCreateVehicle())
  return controller
}
import { FindVehicleByChassisController } from "@controllers/vehicle-controllers/find-vehicle-by-chassis/find-vehicle-by-chassis-controller"
import { makeDbFindVehicleByChassis } from "@factories/usecases/vehicle/db-find-vehicle-by-chassis-factory"

export const makeFindVehicleByChassisController = (): FindVehicleByChassisController => {
  const controller = new FindVehicleByChassisController(makeDbFindVehicleByChassis())
  return controller
}
import { FindVehiclesController } from "@controllers/vehicle-controllers/find-vehicles/find-vehicles-controller";
import { makeDbFindVehicles } from "@factories/usecases/vehicle/db-find-vehicles-factory";

export const makeFindVehiclesController = (): FindVehiclesController => {
  return new FindVehiclesController(makeDbFindVehicles())
}
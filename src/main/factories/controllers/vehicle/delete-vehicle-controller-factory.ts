import { DeleteVehicleController } from "@controllers/vehicle-controllers/delete-vehicle/delete-vehicle-controller";
import { makeDbDeleteVehicle } from "@factories/usecases/vehicle/db-delete-vehicle-factory";

export const makeDeleteVehicleController = (): DeleteVehicleController => {
  const controller = new DeleteVehicleController(makeDbDeleteVehicle())
  return controller
}
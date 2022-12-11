import { UpdateVehicleController } from "@controllers/vehicle-controllers/update-vehicle/update-vehicle-controller";
import { makeDbFindVehicleByChassis } from "@factories/usecases/vehicle/db-find-vehicle-by-chassis-factory";
import { makeDbUpdateVehicle } from "@factories/usecases/vehicle/db-update-vehicle-factory";
import { makeUpdateVehicleValidation } from "./update-vehicle-validation-factory";

export const makeUpdateVehicleController = (): UpdateVehicleController => {  
  return new UpdateVehicleController(
    makeDbFindVehicleByChassis(), 
    makeDbUpdateVehicle(),
    makeUpdateVehicleValidation()
  )
}